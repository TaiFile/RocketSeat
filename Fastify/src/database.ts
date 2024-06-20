import {knex as setupKnex} from 'knex'
import { env } from './routes'


export const config = {
    client: 'sqlite3',
    connection: {
        filename: env.DATABASE_URL
    },
    useNullAsDefault: true,
    migrations: {
        extensions: ['ts'],
        directory: './db/migrations'
    }
}

export const knex = setupKnex({
    client: 'sqlite3',
    connection: {
        filename: './db/app.db'
    },
    useNullAsDefault: true
})