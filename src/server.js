import 'babel-polyfill';
import { createServer } from 'http';
import app from './core/app';
import logger from './core/logger';
import { port } from './core/config';

const server = createServer(app);

export function start() {
  return new Promise((resolve, reject) => {
      server.listen(port);
      server.on('listening', () => {
        logger.info(`listening on port: ${port}`);
        resolve();
      });
      server.on('error', (err) => {
        reject(err);
      });
    });
}

export function stop() {
    server.close();
}

if (require.main === module) {
  start().catch((err) => {
    logger.error(err);
    stop();
  });
}

