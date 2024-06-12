import http from 'node:http'
import { Transform } from 'node:stream';

class InverseNumberStream extends Transform{
    _transform(chunck, encoding, callback){
        const transformed = Number(chunck.toString()) * -1;
        console.log(transformed);
        callback(null,Buffer.from(String(transformed)))
    }
}

// Request => ReadableSteams
// Responde => WritableStream 

const server = http.createServer( async (request, response) => {
    const buffer = []
    for await(const chunck of request){
        buffer.push(chunck);
    }
    const fullStreamContent = Buffer.concat(buffer).toString()
    
    console.log(fullStreamContent)
    return response.end(fullStreamContent)
})

server.listen(4000)