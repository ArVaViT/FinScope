const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const authMiddleware = require('../middleware/auth');
const logger = require('../utils/logger');

router.use(authMiddleware);

router.get('/', async (req, res, next) => {
  try {
    const notifications = await Notification.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    logger.error('Error fetching notifications: ' + error);
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { message, type } = req.body;
    if (!message) return res.status(400).json({ message: 'Message is required' });
    const notification = new Notification({
      userId: req.user.userId,
      message,
      type: type || 'info'
    });
    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    logger.error('Error creating notification: ' + error);
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const notification = await Notification.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    if (!notification) return res.status(404).json({ message: 'Notification not found' });
    res.status(200).json({ message: 'Notification deleted' });
  } catch (error) {
    logger.error('Error deleting notification: ' + error);
    next(error);
  }
});

module.exports = router;
