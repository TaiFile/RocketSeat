import {Database} from './database.js'
import {randomUUID} from 'node:crypto' // UUID => Unique Universal ID

const database = new Database()
export const Routes = [
    {
        method : 'GET',
        path: '/users',
        handler: (request, response) => {
            const users = database.select('users')
            return response
            .end(JSON.stringify(users))
        }
    },
    {
        method: 'POST',
        path: '/users',
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
        path: '/users/:id',  
        handler: async (request, response) => {
            const userId = request.url.split('/')[2]; // Extrair o ID da URL
            const result = await database.delete('users', userId);
            response.writeHead(result ? 204 : 404, { 'Content-Type': 'application/json' });
            return response.end();
        }
    }
]