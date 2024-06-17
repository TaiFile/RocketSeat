import 'dotenv/config'
import {z} from 'zod'

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    DATABASE_URL: z.string(),
    PORT: z.number().default(5000)
})

const _env = envSchema.safeParse(process.env) // serve para validar o schema
if(_env.success === false){  
    console.error(_env.error.format())
    throw new Error('Zod validation failed')
}

export const env = _env.data
