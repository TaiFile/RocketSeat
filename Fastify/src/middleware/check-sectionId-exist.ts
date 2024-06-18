import { FastifyReply, FastifyRequest } from "fastify";

export async function checkSectionIdExist(request: FastifyRequest, response: FastifyReply, done: () => void){
    const sessionId = request.cookies.sessionId;
    if(!sessionId){
        return response.status(401).send({
            error: 'Unauthorized'
        });
    }
    done();
}