const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const config = require('../config');
const { sendEmail } = require('../services/mailer');
const logger = require('../utils/logger');

router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: 'User already exists' });
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const confirmationToken = crypto.randomBytes(32).toString('hex');

    const user = new User({
      name,
      email,
      password: hashedPassword,
      confirmed: false,
      confirmationToken: confirmationToken
    });
    await user.save();

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const confirmationLink = `${frontendUrl}/confirm-email?email=${encodeURIComponent(email)}&token=${confirmationToken}`;
    const subject = 'Confirm Your Email';
    const text = `Please confirm your email by clicking the link: ${confirmationLink}`;
    const html = `<p>Please confirm your email by clicking the link below:</p><p><a href="${confirmationLink}">Confirm Email</a></p>`;
    
    await sendEmail(email, subject, text, html);
    res.status(200).json({ message: 'Registration successful. A confirmation email has been sent to your email address.' });
  } catch (error) {
    logger.error('Registration error: ' + error);
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    if (!user.confirmed) return res.status(403).json({ message: 'Please confirm your email before logging in.' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ userId: user._id }, config.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    logger.error('Login error: ' + error);
    next(error);
  }
});

module.exports = router;
