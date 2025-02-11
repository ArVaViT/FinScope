const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const authMiddleware = require('../middleware/auth');
const logger = require('../utils/logger');

router.use(authMiddleware);

router.get('/', async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.userId });
    res.status(200).json(transactions);
  } catch (error) {
    logger.error('Error fetching transactions: ' + error);
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { description, amount, date, category } = req.body;
    if (!description || !amount || !date || !category) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const transaction = new Transaction({
      userId: req.user.userId,
      description,
      amount,
      date,
      category,
    });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    logger.error('Error creating transaction: ' + error);
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true }
    );
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
    res.status(200).json(transaction);
  } catch (error) {
    logger.error('Error updating transaction: ' + error);
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const transaction = await Transaction.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
    res.status(200).json({ message: 'Transaction deleted' });
  } catch (error) {
    logger.error('Error deleting transaction: ' + error);
    next(error);
  }
});

module.exports = router;
