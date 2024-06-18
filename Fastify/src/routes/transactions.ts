import fastify, { FastifyInstance } from "fastify";
import z from 'zod'
import {randomUUID } from "crypto";
import { knex } from "../database";
import { title } from "process";
import { error } from "console";
import { checkSectionIdExist } from "../middleware/check-sectionId-exist";

// Cookies <-> formas de manter contexto entre requisições
// No momento que você acessa o site, salva uma informação como ID no navegador

export async function transactionsRoutes(app: FastifyInstance){
    app.get('/', 
        {
            preHandler: checkSectionIdExist
        }
        , async (request, response) =>{
        const sessionId = request.cookies.sessionId;
        const transactions = await knex('transactions').select('*').where('session_id', sessionId)
        return transactions;
    })

    app.get('/:id',
        {
            preHandler: checkSectionIdExist
        }
        , async (request, response) =>{
        const sessionId = request.cookies.sectionId;
        const getTransactionSchema = z.object({
            id:z.string().uuid(),
        })
        const  { id } = getTransactionSchema.parse(request.params);
        const transaction = await knex('transactions').select('*').where({
            session_id: sessionId,
            id,
        }).first();
        return response.send(transaction);
    })

    app.get('/summary', 
        {
            preHandler: checkSectionIdExist
        }
        , async (request, response) =>{
        const sessionId = request.cookies.sessionId;
        const summary = await knex('transactions').where('session_id',sessionId).sum('amount', {as : 'amount'}).first();

        return summary;
    })

    app.post('/',
        {
            preHandler: checkSectionIdExist
        }
        , async (request, response) =>{
        // {title, amout, type: credit or debit}
        const createTransactionSchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit']),
        })
        const {title, amount , type} = createTransactionSchema.parse(request.body);

        let sessionId= request.cookies.sessionId;

        if(!sessionId){
            sessionId = randomUUID();
            response.setCookie('sessionId', sessionId,{
                path: '/',
                maxAge: 60 * 60 * 24 * 7, // 7day
            });
        }
        
        await knex('transactions').insert({
            id: randomUUID(),
            title,
            amount: type === 'credit' ? amount : amount * -1,
            session_id: sessionId
        })
        return response.status(201).send();
    })  
}