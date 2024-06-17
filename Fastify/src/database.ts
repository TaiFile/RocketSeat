import {knex as setupKnex} from 'knex'

export const config = {
    client: 'sqlite3',
    connection: {
        filename: './db/app.db'
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