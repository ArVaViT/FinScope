const express = require('express');
const router = express.Router();
const fetch = require('node-fetch'); // якщо ще не встановлено — додай

router.post('/analyze', async (req, res) => {
  try {
    const transactions = req.body.transactions;

    if (!Array.isArray(transactions)) {
      return res.status(400).json({ error: 'Invalid transactions array' });
    }

    const response = await fetch(`${process.env.AI_SERVICE_URL}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transactions }),
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(502).json({ error: 'AI service error', details: text });
    }

    const data = await response.json(); // { comment: "..." }
    return res.json(data);

  } catch (error) {
    console.error('AI analyze error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
