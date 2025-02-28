import express from 'express'
import router from './router'
import cors,{CorsOptions} from 'cors'
import dotenv from 'dotenv'
 dotenv.config({path:'.env.local'})
 const server = express()
 const frontendUrl = process.env.FRONTEND_URL
//enabling cors optios
const corsOption :CorsOptions ={
    origin:function (origin,callback){
        if(!origin||origin===`${frontendUrl}` ){
         callback(null,true)
        }else{
        callback(new Error('There is a cors errors'))
        }
        console.log(origin)
    }
}
//enabling json reading
server.use(express.json())
server.use(cors(corsOption))
server.use('/api/portfolio',router)
export default server