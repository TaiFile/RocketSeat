import { app } from "./app"
import { env } from "./routes"

app.listen({
    port:env.PORT
}).then(()=>{
    console.log('HTTP Server running')
})