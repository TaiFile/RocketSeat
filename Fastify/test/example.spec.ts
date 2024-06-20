import {expect, test, beforeAll, afterAll, it, beforeEach} from 'vitest'
import {app} from '../src/app'
import request from 'supertest' 
import { before, describe } from 'node:test'
import { randomUUID } from 'crypto'
import { execSync } from 'child_process'

describe('Transactions Routes', async() =>{
    beforeAll(async () => {
        execSync('npm run knex migrate:latest')
        await app.ready()
    })
    
    afterAll(async () => { 
        await app.close()
    })

    beforeEach(async () => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
    })

    it('should be able to create a new transaction', async () =>{
        await request(app.server)
        .post('/transactions')
        .send({
            title: "salario", 
            amount: 1000,
            type: "credit"
        })
        .set('Cookie', `sessionId=${randomUUID()}`)
        .expect(201)
    })   
    it('should be able to list all transaction', async() =>{
        const createTransactionsresponse = await request(app.server)
        .post('/transactions')
        .send({
            title: "salario", 
            amount: 1000,
            type: "credit"
        })
        .set('Cookie', `sessionId=${randomUUID()}`)
        
        const ListTransacitonResponse = await request(app.server)
        .get('/transactions')
        .set('Cookie', `sessionId=${randomUUID()}`)
        .expect(200)
    })
    // it('should be able to list a specific transaction', async() =>{
    //     const createTransactionsresponse = await request(app.server)
    //     .post('/transactions')
    //     .send({
    //         title: "salario", 
    //         amount: 1000,
    //         type: "credit"
    //     })
    //     .set('Cookie', `sessionId=${randomUUID()}`)
        
    //     const ListTransacitonResponse = await request(app.server)
    //     .get('/transactions')
    //     .set('Cookie', `sessionId=${randomUUID()}`)
    //     .expect(200)

    //     const transactionId = ListTransacitonResponse.body.transaction
    //     const getTransactionResponse = await request(app.server)
    //     .get(`/transactions/${transactionId}`)
    //     .set('Cookie', `sessionId=${randomUUID()}`)
    //     .expect(200)
    // })
//     it('should be able to get the summary', async() =>{
//         const createTransactionsresponse = await request(app.server)
//         .post('/transactions')
//         .send({
//             title: "salario", 
//             amount: 1000,
//             type: "credit"
//         })
//         .set('Cookie', `sessionId=${randomUUID()}`)

//         const createnewTransactionsresponse = await request(app.server)
//         .post('/transactions')  
//         .send({
//             title: "salario", 
//             amount: 1000,
//             type: "credit"
//         })
//         .set('Cookie', `sessionId=${randomUUID()}`)
        
//         const SummaryTransaction= await request(app.server)
//         .get('/transactions/summary')
//         .set('Cookie', `sessionId=${randomUUID()}`)
//         expect(SummaryTransaction.body.amount).toEqual({
//             amount: 2000
//         })
//     })
 })