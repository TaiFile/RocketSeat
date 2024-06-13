import http from 'node:http'
import {json} from './middlewares/json.js'
import {Routes} from './middlewares/routes.js'
import { extractQueryParams } from './utils/extract-query-params.js';
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

//Query Parameters: URL Stateful, enviar informação que não são sensíveis
//Route Parameters: Identificação de recurso
//Request Body: Envio de informações de um formulário

// localhost:5000/users?userID=(algum id) (Route Parameters)
// GET localhost:5000/users/1 (Route Parameteres)
// DELETE localhost:5000/users/1 (Route Parameteres)
// POST localhost:5000/users (request body, não modifica o url, para segurança)

const server = http.createServer( async(request, response)=>{
    // através do request irei conseguir informações como (name, email, senha)
    // response = irei ganhar uma resposta para o (name, email, senha, etc)
    const {method, url} = request;
    await json(request, response);

    const route = Routes.find(route=>{
        return route.method === method && route.path.test(url)
    })
    if(route){
        const routeParams = request.url.match(route.path)
        //request.params ={...routeParams.groups}
        const {query, ...params} = routeParams.groups

        request.params = params
        request.query = query ? extractQueryParams(query) : {}

        return route.handler(request, response)
    }else{
        console.log('Comand not found')
    }
    return response.writeHead(404).end('Not Found');
});

server.listen(5000)