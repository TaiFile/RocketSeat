// Netflix e Spotify
// Importações de clientes via CSV (Excel)
// Conseguir trabalhar com pequenas parte de alguma coisa, mesmo antes de ler o arquivo completo

// Readble Streams / Writable Streams

import {Readable,Writable,Transform} from 'node:stream'

class OneToHundredStreams extends Readable{
    index = 1;
    _read(){
        // retorna quais são os dados dessa stream
        setTimeout(()=>{
            const i = this.index++;
            if(i > 100){
                this.push(null);
            }else{
                const buffer = Buffer.from(String(i))
                this.push(buffer)
            }
        },100)
    }
}

class MultiplyByTenStream extends Writable{
    _write(chunck, encoding, callback){
        console.log(Number(chunck.toString()) * 10)
        callback()
    }
}

class InverseNumberStream extends Transform{
    _transform(chunck, encoding, callback){
        const transformed = Number(chunck.toString()) * -1;
        callback(null,Buffer.from(String(transformed)))
    }
}

new OneToHundredStreams()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream())