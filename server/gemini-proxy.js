import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

app.post('/api/gemini', async (req, res) => {
  const { message } = req.body;
  const API_KEY = process.env.GEMINI_API_KEY;
  const model = 'gemini-2.5-flash'; // Hardcoding the confirmed model

  if (!API_KEY) {
    return res.status(500).json({ error: 'GEMINI_API_KEY not found in .env file' });
  }

  if (!message) {
    return res.status(400).json({ error: 'message is required' });
  }

  const url = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${API_KEY}`;

  const payload = {
    contents: [
      {
        parts: [{ text: message }],
      },
    ],
  };

  try {
    const apiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // Forward the status and headers from the Google API response
    res.status(apiResponse.status);
    apiResponse.headers.forEach((value, name) => {
      res.setHeader(name, value);
    });

    // Pipe the body of the Google API response directly to our response
    apiResponse.body.pipe(res);

  } catch (error) {
    console.error('Proxy server error:', error);
    res.status(500).json({ error: 'An unexpected error occurred in the proxy server.' });
  }
});

app.listen(PORT, () => {
  console.log(`Simplified Gemini proxy running on http://localhost:${PORT}`);
});