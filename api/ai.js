// /api/ai.js — Vercel Serverless Function
// Proxies chat requests to Google Gemini so the API key never reaches the browser.
// Requires an environment variable in Vercel: GEMINI_API_KEY

const RATE_LIMIT_WINDOW = 60000; // 1 minute in milliseconds
const RATE_LIMIT_MAX = 30; // Max requests per window per IP
const requestCounts = {}; // In-memory store (resets on deploy)

function checkRateLimit(ip) {
  const now = Date.now();
  if (!requestCounts[ip]) {
    requestCounts[ip] = [];
  }
  
  // Remove old requests outside the window
  requestCounts[ip] = requestCounts[ip].filter(t => now - t < RATE_LIMIT_WINDOW);
  
  if (requestCounts[ip].length >= RATE_LIMIT_MAX) {
    return false;
  }
  
  requestCounts[ip].push(now);
  return true;
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed. Use POST.' });
    return;
  }

  // Rate limiting check
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  if (!checkRateLimit(clientIp)) {
    res.status(429).json({ error: 'Too many requests. Try again later.' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('GEMINI_API_KEY not found in environment variables');
    res.status(500).json({ 
      error: 'Server configuration error. Add GEMINI_API_KEY in Vercel → Project Settings → Environment Variables.' 
    });
    return;
  }

  const { system, messages } = req.body || {};
  
  if (!Array.isArray(messages) || !messages.length) {
    res.status(400).json({ error: 'messages must be a non-empty array' });
    return;
  }

  // Security: limit message history to last 20 turns
  const limitedMessages = messages.slice(-20);

  try {
    // Convert our {role, parts:[{text}|{image:{mimeType,data}}]}[] into Gemini's format.
    const contents = limitedMessages.map((m) => {
      const parts = Array.isArray(m.parts) ? m.parts : [{ text: String(m.content || '') }];
      return {
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: parts.map((p) => {
          if (p.image && p.image.data) {
            return { 
              inlineData: { 
                mimeType: p.image.mimeType || 'image/jpeg', 
                data: p.image.data 
              } 
            };
          }
          return { text: String(p.text || '').slice(0, 8000) };
        }),
      };
    });

    const body = {
      contents,
      generationConfig: { 
        maxOutputTokens: 800,
        temperature: 0.7,
        topP: 0.95,
        topK: 40
      },
      safetySettings: [
        {
          category: 'HARM_CATEGORY_HARASSMENT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE'
        },
        {
          category: 'HARM_CATEGORY_HATE_SPEECH',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE'
        },
        {
          category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE'
        },
        {
          category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE'
        }
      ]
    };
    
    if (system) {
      body.systemInstruction = { 
        parts: [{ text: String(system).slice(0, 4000) }] 
      };
    }

    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify(body),
        timeout: 30000
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = data?.error?.message || `Gemini API error (${response.status})`;
      console.error('Gemini API error:', errorMsg);
      res.status(response.status).json({ error: errorMsg });
      return;
    }

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      'I could not generate a response right now. Please try again.';

    res.status(200).json({ text });
  } catch (error) {
    console.error('Serverless function error:', error.message);
    res.status(500).json({ 
      error: error.message || 'Unknown server error. Please try again later.' 
    });
  }
}
