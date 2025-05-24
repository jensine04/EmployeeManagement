import {Request, Response, Router, NextFunction} from "express";
import EmployeeRepository from "../repositories/employee.repository";
import EmployeeService from "../services/employee.service";
import HttpException from "../exception/httpException";
import { isEmail } from "../validators/emailValidator";
import { EmployeeRole } from "../entities/employee.entity";
import { plainToInstance } from "class-transformer";
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import { UpdateEmployeeDto } from "../dto/update-employee.dto";
import { validate } from "class-validator";
import authorizationMiddleware from "../middlewares/authorization.middleware"

class EmployeeController{
    constructor(private employeeService: EmployeeService, router: Router){
        router.post("/",authorizationMiddleware([EmployeeRole.HR]) ,this.createEmployee.bind(this));
        router.get("/",this.getAllEmployees.bind(this));
        router.get("/:id",this.getEmployeeById.bind(this));
        router.put("/:id",authorizationMiddleware([EmployeeRole.HR,EmployeeRole.DEVELOPER]),this.updateEmployee.bind(this));
        router.delete("/:id",authorizationMiddleware([EmployeeRole.HR]) ,this.deleteEmployee);
    }

    async createEmployee(req: Request, res: Response, next: NextFunction) {
        try {
            const createEmployeeDto = plainToInstance(CreateEmployeeDto, req.body);
            const errors = await validate(createEmployeeDto);
            if (errors.length > 0) {
                console.log(JSON.stringify(errors));
                throw new HttpException(400, JSON.stringify(errors));
            }
            const savedEmployee = await this.employeeService.createEmployee(
                createEmployeeDto.email,
                createEmployeeDto.name,
                createEmployeeDto.age,
                createEmployeeDto.role,
                createEmployeeDto.address,
                createEmployeeDto.password
            );
            res.status(201).send(savedEmployee);
        }
        catch (err) {
            console.log(err);
            next(err)

        }
    }

    async getAllEmployees(req: Request, res: Response,next: NextFunction) {
        console.log(req.user)
        const employees= await this.employeeService.getAllEmployees();
        res.status(200).send(employees);
    }

    async getEmployeeById(req: Request, res: Response, next: NextFunction) {
        try{
            const id = Number(req.params.id);
            const employee = await this.employeeService.getEmployeeById(id);
            if (!employee) {
                throw new HttpException(404,"Employee not found");
                
            }
            res.status(200).send(employee);
        }
        catch(err){
            console.log(err);
            next(err);
        }
        
        
    }

    async updateEmployee( req: Request, res: Response, next: NextFunction) {
        try{
        const updateEmployeeDto = plainToInstance(UpdateEmployeeDto, req.body);
        const errors = await validate(updateEmployeeDto);
            if (errors.length > 0) {
                console.log(JSON.stringify(errors));
                throw new HttpException(400, JSON.stringify(errors));
            }
        const updatedEmployee=await this.employeeService.updateEmployee(
            Number(req.params.id),
            updateEmployeeDto.email,
            updateEmployeeDto.name,
            updateEmployeeDto.age,
            updateEmployeeDto.role,
            updateEmployeeDto.address,
            updateEmployeeDto.password
        );
        res.status(200).send(updatedEmployee);
    }
        catch (err) {
            console.log(err);
            next(err)

        }

    }


    async deleteEmployee(req: Request, res: Response){
        const id= Number(req.params.id);
        await this.employeeService.deleteEmployee(id);
        res.status(204).send();
    }


 }

 
 export default EmployeeController;