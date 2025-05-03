const Sentry = require('@sentry/node');

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
    serviceName: process.env.SENTRY_SERVICE_NAME || 'default-server',
    environment: process.env.SENTRY_ENVIRONMENT || 'development',
    sendDefaultPii: true,
});

module.exports = Sentry;