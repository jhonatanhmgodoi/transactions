import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('production'),
  DATABASE_URL: z.string(),
  PORT: z.number().default(3333),
})

const _env = envSchema.safeParse(process.env) // o parse não dispara um erro caso a validação falhe. Por isso usar safeParse

if (_env.success === false) {
  console.error('Invalid enviroment variables!', _env.error.format()) // formata os erros
  throw new Error('Invalid enviroment variables.')
}

export const env = _env.data
