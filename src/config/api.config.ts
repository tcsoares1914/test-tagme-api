import { registerAs } from '@nestjs/config';
import { ApiConfig } from '@src/interfaces/api.config';

const { APPLICATION_PORT } = process.env;

export const defaultApiConfig: ApiConfig = {
  port: parseInt(APPLICATION_PORT, 10) || 3000,
};

export default registerAs('api', (): ApiConfig => defaultApiConfig);
