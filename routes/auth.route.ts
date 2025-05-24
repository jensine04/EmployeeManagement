import { AuthController } from "../controllers/auth.controller";
import datasource from "../db/data-source";
import Employee from "../entities/employee.entity";
import EmployeeRepository from "../repositories/employee.repository";
import { AuthService } from "../services/auth.service";
import express from 'express';
import {Router} from 'express';
import {employeeService} from "./employee.route";

const authRouter=express.Router();


const authService=new AuthService(employeeService);
const authController=new AuthController(authService,authRouter);

export {employeeService}
export default authRouter;