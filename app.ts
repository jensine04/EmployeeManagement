import express from "express";
import loggerMiddleware from "./middlewares/loggerMiddleware";
import datasource from "./db/data-source";
import processTimeMiddleware from "./middlewares/processTimeMiddleware";
import employeeRouter from "./routes/employee.route";
import departmentRouter from "./routes/department.route";
import authRouter from "./routes/auth.route";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { authMiddleWare } from "./middlewares/auth.middleware";
import { LoggerService } from "./services/logger.service";

const { Client } = require('pg');

const server = express();
const logger=LoggerService.getInstance('app()')

server.use(express.json());
server.use(loggerMiddleware);

server.use("/employee",authMiddleWare, employeeRouter);
server.use("/department",authMiddleWare,departmentRouter);
server.use("/auth",authRouter);
server.use(errorMiddleware);

server.get("/", (req, res) => {
  console.log(req.url);
  res.status(200).send("Hello world typescript");
});


(async () => {
  try{
    await datasource.initialize();
    logger.info('connected');
    server.listen(3000, () => {
    logger.info("server listening to 3000");
    }); 
  }
  catch {
    logger.error('Failed to connect to DB');
    process.exit(1);
  }
  
})
();


