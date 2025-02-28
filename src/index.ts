import server from "./server";
import dotenv from 'dotenv'


dotenv.config({path:'.env.local'})
const port = Number(process.env.PORT) || 4001


server.listen(port,()=>{
    console.log(`Server running on port ${port} `)
})