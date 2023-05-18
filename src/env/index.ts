import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'production']).default('dev'),
  JWT_SECRET: z.string(),
  GPT_API_KEY: z.string(),
  STRIPE_SECRET: z.string(),
  PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid enrionment variables', _env.error.format())

  throw new Error('Invalid environment variables')
}

export const env = _env.data
