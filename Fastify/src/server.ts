import { fastify } from "fastify";
import { knex } from "./database";
import crypto from 'crypto'
import { env } from "./env";

const app = fastify()

// GET, POST, PUT, PATCH, DELETE

// http://localhost:5000/hello

app.get('/hello', async () =>{
    const transactions = await knex('transactions').insert({
        id: crypto.randomUUID(),
        title: 'Transação teste',
        amount: 1000,
    }).returning('*')
    return transactions;
})

app.get('/transactions', async () =>{
    const transactions = await knex('transactions').select('*')
    return transactions;
})
app.listen({
    port:env.PORT
}).then(()=>{
    console.log('HTTP Server running')
})