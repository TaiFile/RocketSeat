export async function json(request, response){
    const buffer = []
    for await(const chunck of request){
        buffer.push(chunck);
    }
    try{
        request.body = JSON.parse(Buffer.concat(buffer).toString())
    }catch{
        request.body = null
    }
    response.setHeader('Content-Type', 'application/json');
}