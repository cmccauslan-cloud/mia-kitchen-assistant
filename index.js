require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();

const port = process.env.PORT || 3000;
const endpoint = process.env.ACTION_ENDPOINT;
const key = process.env.GOOGLE_API_KEY;
const owner = process.env.OWNER_NAME || 'Jackie';

app.use(express.json());

app.get('/', (req, res) => {
  res.send(`✅ Mia Kitchen Assistant API is live for ${owner}!`);
});

app.post('/pantry', async (req, res) => {
  try {
    const response = await fetch(`${endpoint}?action=pull&key=${key}`);
    const data = await response.json();
    res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to fetch from Google Apps Script' });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`Connected to endpoint: ${endpoint}`);
});
