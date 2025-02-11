const crypto = require('crypto');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const PasswordResetToken = require('../models/PasswordResetToken');
const mailgun = require('mailgun-js');
const config = require('../config');
const logger = require('../utils/logger');

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
});

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });
    const user = await User.findOne({ email });
    if (!user) return res.status(200).json({ message: 'If that email exists, a reset link has been sent.' });
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = Date.now() + 3600000;
    await PasswordResetToken.findOneAndUpdate(
      { userId: user._id },
      { token, expiresAt },
      { upsert: true, new: true }
    );
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const resetLink = `${frontendUrl}/reset-password?email=${encodeURIComponent(email)}&token=${token}`;
    const mailData = {
      from: 'no-reply@finscope.com',
      to: email,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Please click the link below to reset your password:\n\n${resetLink}\n\nIf you did not request this, please ignore this email.`
    };
    mg.messages().send(mailData, (error, body) => {
      if (error) logger.error('Mailgun error: ' + error);
    });
    res.status(200).json({ message: 'If that email exists, a reset link has been sent.' });
  } catch (error) {
    logger.error('Error in forgotPassword: ' + error);
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { email, token, newPassword } = req.body;
    if (!email || !token || !newPassword) return res.status(400).json({ message: 'Email, token and new password are required' });
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid request' });
    const resetTokenDoc = await PasswordResetToken.findOne({ userId: user._id, token });
    if (!resetTokenDoc || resetTokenDoc.expiresAt < Date.now()) return res.status(400).json({ message: 'Invalid or expired token' });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    await PasswordResetToken.deleteOne({ userId: user._id });
    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    logger.error('Error in resetPassword: ' + error);
    next(error);
  }
};
