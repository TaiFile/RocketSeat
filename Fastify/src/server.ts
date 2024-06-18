import { fastify } from "fastify";
import { knex } from "./database";
import crypto from 'crypto'
import { env } from "./env";
import { transactionsRoutes } from "./routes/transactions";
import cookie from "@fastify/cookie";

const app = fastify()

// GET, POST, PUT, PATCH, DELETE

// http://localhost:5000/hello

app.register(cookie)
app.register(transactionsRoutes, {
    prefix: 'transactions'
})

app.listen({
    port:env.PORT
}).then(()=>{
    console.log('HTTP Server running')
})