// intuito de poder salvar não somente o usuários no database
import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

export class Database{
    #database = {}

    constructor(){
        fs.readFile(databasePath, 'utf-8')
        .then(data=>{
            this.#database = JSON.parse(data)
        })
        .catch(()=>{
            this.persiste()
        })
    }
    
    async persiste(){
        try{
            fs.writeFile(databasePath, JSON.stringify(this.#database))
        }
        catch(error){
            console.log('Error persiste', error)
        }
    }

    select(table){
        const data = this.#database[table] ?? []
        return data
    }
    insert(table, data){
        if(Array.isArray(this.#database[table])){
            this.#database[table].push(data)
        }else{
            this.#database[table] = [data]
        }
        return data;
    }
}