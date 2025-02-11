// routes/analytics.js
const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const authMiddleware = require('../middleware/auth');

// Захист маршруту аналітики (якщо потрібно)
router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const { transactions } = req.body;
    // Заглушка для AI-аналітики
    const predictions = {
      totalIncome: 10000,
      totalExpenses: 8000,
      savings: 2000,
      expenseBreakdown: [
        { category: 'Food', amount: 300 },
        { category: 'Transport', amount: 200 },
      ],
    };
    res.status(200).json(predictions);
  } catch (error) {
    logger.error('Analytics error: ' + error);
    next(error);
  }
});

module.exports = router;
