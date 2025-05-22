import {Request, Response, Router, NextFunction} from "express";
import EmployeeRepository from "../repositories/employee.repository";
import EmployeeService from "../services/employee.service";
import HttpException from "../exception/httpException";
import { isEmail } from "../validators/emailValidator";
import { plainToInstance } from "class-transformer";
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import { validate } from "class-validator";


class EmployeeController{
    constructor(private employeeService: EmployeeService, router: Router){
        router.post("/",this.createEmployee.bind(this));
        router.get("/",this.getAllEmployees.bind(this));
        router.get("/:id",this.getEmployeeById.bind(this));
        router.put("/:id",this.updateEmployee);
        router.delete("/:id",this.deleteEmployee);
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
                createEmployeeDto.address
            );
            res.status(201).send(savedEmployee);
        }
        catch (err) {
            console.log(err);
            next(err)

        }
    }

    async getAllEmployees(req: Request, res: Response,next: NextFunction) {
        const employees= await this.employeeService.getAllEmployees();
        res.status(200).send(employees);
    }

    async getEmployeeById(req: Request, res: Response, next: NextFunction) {
        try{
            const id = Number(req.params.id);
            const employee = await this.employeeService.getEmployeeById(id);
            if (!employee) {
                throw new Error("Employee not found");
                
                
            }
            res.status(200).send(employee);
        }
        catch(err){
            // res.send(400) ;
            console.log(err);
            next(err);
        }
        
        
    }

    async updateEmployee( req: Request, res: Response) {
        const id= Number(req.params.id);
        const email=req.body.email;
        const name=req.body.name;
        await this.employeeService.updateEmployee(id,email,name);
        res.status(200).send();
    }


    async deleteEmployee(req: Request, res: Response){
        const id= Number(req.params.id);
        await this.employeeService.deleteEmployee(id);
        res.status(204).send();
    }


 }

 
 export default EmployeeController;