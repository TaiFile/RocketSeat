import http from 'node:http'
import {json} from './middlewares/json.js'
import {Routes} from './middlewares/routes.js'
// ComonnJS -> require

// HTTP
//  - Método HTTP
//  - URL

//Get, post, put, patch, delete

//GET => buscar um recurso do backend
//POST => Criar um recursa
//PUT => Editar ou atualizar um recurso no backend
//PATCH => Atualizar uma informação específica de um recurso no back-end
//DELETE => deletar um recurso do back-end

// Podemos ter 2 urls iguais, porém com métodos diferentes
// GET /users => buscando usuários no back-end
// POST/users => Criar um usuário no back-end

// Stateful - Stateless (depende de informações que são salvas em memórias)

// JSON - JavaScript Object Notation

// Cabelalhos (Requisições/resposta) => Metadados, informações adicionais que não tem a ver com o dado retornado do backend para o frontend
// mas como o dado pode ser interpretado

// HTTP Status Code (simboliza se o que enviou foi sucesso/erro/etc)

const server = http.createServer( async(request, response)=>{
    // através do request irei conseguir informações como (name, email, senha)
    // response = irei ganhar uma resposta para o (name, email, senha, etc)
    const {method, url} = request;
    await json(request, response);

    const route = Routes.find(route=>{
        return route.method === method && route.path === url
    })
    if(route){
        return route.handler(request, response)
    }else{
        console.log('Comand not found')
    }
    return response.writeHead(404).end('Not Found');
});

server.listen(5000)