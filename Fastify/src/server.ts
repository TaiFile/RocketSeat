import { fastify } from "fastify";
import { knex } from "./database";

const app = fastify()

// GET, POST, PUT, PATCH, DELETE

// http://localhost:5000/hello

app.get('/hello', async () =>{
    const table =  await knex('sqlite_schema').select('*')
    return table;
})
app.listen({
    port:5000,
}).then(()=>{
    console.log('HTTP Server running')
})