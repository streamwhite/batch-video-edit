import pino from 'pino';

export function createLogger() {
  return pino(
    {
      level: 'info',
    },
    pino.destination('./pino-logger.log')
  );
}
