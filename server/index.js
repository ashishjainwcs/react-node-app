const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 80;
const INTERNAL_API = 'https://commerce-2ac0.restdb.io/rest/products';

// CORS if needed
app.use(cors());

// Serve static React files
//app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.static('public'));

// Proxy API requests
app.use('/api', async (req, res) => {
  const targetUrl = INTERNAL_API + req.originalUrl.replace('/api', '');
  try {
    const response = await fetch(targetUrl);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Proxy error' });
  }
});

app.use('/products', async (req, res) => {
    console.log("request received - products api");
  const targetUrl = INTERNAL_API;
  const myHeaders = req.headers;
  try {
    const response = await fetch(targetUrl, {
        method: 'GET',
        headers: myHeaders
    });
    const data = await response.json();
    console.log("NodeJS : RESPONSE from restdb :"+data);
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Proxy error' });
  }
});

// Fallback to index.html (for React Router)
app.get('', (req, res) => {
//  res.sendFile(path.join(__dirname, '../client/build/index.html'));
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});