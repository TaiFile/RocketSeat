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
    
    persiste(){
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
    delete(table, id){
        const rowIndex = this.#database[table].findIndex(row => row.id === id)
        if(rowIndex > -1){
            this.#database[table].splice(rowIndex,1)
            this.persiste()
        }
    }
    update(table, id, data){
        const rowIndex = this.#database[table].findIndex(row => row.id === id)
        if(rowIndex > -1){
            this.#database[table][rowIndex] = {id, ...data}
            this.persiste()
        }
    }

    select(table, search){
        let data = this.#database[table] ?? []
        if(search){
            data = data.filter(row => {
                return Object.entries(search).some(([key, value]) => {
                    return row[key].includes(value)
                })
            })
        }
        return data
    }
}