import { z } from 'zod';
export const envSchema = z.object({
  PORT: z.string().length(4, { message: 'Port must be 4 character long.' }),
  DB_HOST: z.string(),
  DB_PORT: z.string().length(4, { message: 'Port must be 4 character long.' }),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_DATABASE: z.string(),
});
