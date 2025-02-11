const express = require('express');
const router = express.Router();
const User = require('../models/User');
const logger = require('../utils/logger');

router.get('/confirm', async (req, res, next) => {
  try {
    const { email, token } = req.query;
    if (!email || !token) {
      return res.status(400).json({ message: 'Missing email or token.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or token.' });
    }

    if (user.confirmed) {
      return res.status(200).json({ message: 'Email already confirmed.' });
    }

    if (user.confirmationToken !== token) {
      return res.status(400).json({ message: 'Invalid confirmation token.' });
    }

    user.confirmed = true;
    user.confirmationToken = null;
    await user.save();
    res.status(200).json({ message: 'Email confirmed successfully.' });
  } catch (error) {
    logger.error('Error in email confirmation: ' + error);
    next(error);
  }
});

module.exports = router;
