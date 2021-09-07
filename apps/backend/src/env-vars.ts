import * as dotenv from 'dotenv';
import { z } from 'zod';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: `${process.cwd()}/apps/backend/.env` });
}

const envVarsSchema = z.object({
  DATABASE_HOST: z.string(),
  DATABASE_PORT: z
    .string()
    .or(z.number())
    .transform((val) => Number(val)),
  DATABASE_USERNAME: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_NAME: z.string(),
});

export type EnvVars = z.infer<typeof envVarsSchema>;

export const envVars = envVarsSchema.parse(process.env);
