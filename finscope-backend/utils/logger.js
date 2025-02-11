// utils/logger.js
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Console()
    // За потреби можна додати:
    // new transports.File({ filename: 'error.log', level: 'error' })
  ]
});

module.exports = logger;
