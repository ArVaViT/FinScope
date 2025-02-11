const crypto = require('crypto');
const PasswordResetToken = require('../models/PasswordResetToken');
const mailgun = require('mailgun-js');
const logger = require('../utils/logger');

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
});

exports.generateToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

exports.saveToken = async (userId, token) => {
  const expiresAt = Date.now() + 3600000;
  const resetTokenDoc = await PasswordResetToken.findOneAndUpdate(
    { userId },
    { token, expiresAt },
    { upsert: true, new: true }
  );
  return resetTokenDoc;
};

exports.sendResetEmail = async (email, resetLink) => {
  const mailData = {
    from: 'no-reply@finscope.com',
    to: email,
    subject: 'Password Reset Request',
    text: `You requested a password reset. Please click the link below to reset your password:\n\n${resetLink}\n\nIf you did not request this, please ignore this email.`
  };
  return new Promise((resolve, reject) => {
    mg.messages().send(mailData, (error, body) => {
      if (error) {
        logger.error('Mailgun error in sendResetEmail: ' + error);
        return reject(error);
      }
      resolve(body);
    });
  });
};

exports.validateToken = async (userId, token) => {
  const resetTokenDoc = await PasswordResetToken.findOne({ userId, token });
  if (!resetTokenDoc || resetTokenDoc.expiresAt < Date.now()) {
    return false;
  }
  return true;
};

exports.deleteToken = async (userId) => {
  await PasswordResetToken.deleteOne({ userId });
};
