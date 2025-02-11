const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
});

function sendEmail(to, subject, text, html = '') {
  const domain = process.env.MAILGUN_DOMAIN;
  const data = {
    from: 'FinScope <no-reply@officialfinscope.com>',
    to: [to],
    subject,
    text,
    html,
  };

  return mg.messages.create(domain, data)
    .then(msg => msg)
    .catch(err => { throw err; });
}

module.exports = { sendEmail };
