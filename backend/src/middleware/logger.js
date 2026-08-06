const morgan = require('morgan');

/**
 * Custom Logger Middleware for MissionX Express API
 * Formats: [TIMESTAMP] METHOD URL STATUS RESPONSE_TIME ms - IP
 */
const customFormat = ':date[iso] | :method :url | Status: :status | :response-time ms | IP: :remote-addr';

const loggerMiddleware = morgan(customFormat, {
  skip: (req) => process.env.NODE_ENV === 'test',
});

module.exports = loggerMiddleware;
