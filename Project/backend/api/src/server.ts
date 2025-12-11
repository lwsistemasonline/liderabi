import 'dotenv/config';
import app from './app';
import Logger from './middleware/logger';

const logger = new Logger();

const PORT = parseInt(process.env.API_PORT || '3000');
const HOST = process.env.API_HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  logger.info(`Server is running on ${HOST}:${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
