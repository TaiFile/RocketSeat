import {Readable} from 'node:stream'

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

fetch('http://localhost:4000', {
    method:'POST',
    body: new OneToHundredStreams(),
    duplex: 'half' 
}).then(response =>{
    response.text()
}).then(data=>{
    console.log(data)
})