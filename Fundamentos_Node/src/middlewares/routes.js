import { buildRputePath } from '../utils/build-rout-path.js'
import {Database} from './database.js'
import {randomUUID} from 'node:crypto' // UUID => Unique Universal ID

const database = new Database()
export const Routes = [
    {
        method : 'GET',
        path: buildRputePath('/users'),
        handler: (request, response) => {
            const users = database.select('users')
            return response
            .end(JSON.stringify(users))
        }
    },
    {
        method: 'POST',
        path: buildRputePath('/users'),
        handler: (request, response) => {
            const { name, email } = request.body;
            const user = {
                id: randomUUID(),
                name,
                email,
            }
            database.insert('users', user)
            database.persiste()
            return response.writeHead(201).end()
        }
    },
    {
        method: 'DELETE',
        path: buildRputePath('/users/:id'),  
        handler: async (request, response) => {
            const {id} = request.params
            database.delete('users', id)
            return response.writeHead(204).end()
        }
    }
]