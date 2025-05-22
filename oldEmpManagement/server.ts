import express, {Request,Response} from 'express';
import employeeRouter from './employee_router';
import { loggerMiddleware } from './loggerMiddleware';
const server= express();

server.use(express.json());
server.use(loggerMiddleware);

server.get('/', (req,res) =>{
    console.log(req.url);
    res.status(200).send("hello from server");
})


server.use("/employees", employeeRouter)



server.listen(3000, ()=>{
    console.log("Server Listening")
}) 