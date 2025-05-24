import {Request, Response, Router, NextFunction} from "express";
import HttpException from "../exception/httpException";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateDepartmentDto } from "../dto/create-department.dto";
import authorizationMiddleware from "../middlewares/authorization.middleware"
import DepartmentService from "../services/department.service";
import { EmployeeRole } from "../entities/employee.entity";
import DepartmentRepository from "../repositories/department.repository";

class DepartmentController{
    constructor(private departmentService: DepartmentService, router: Router){
        router.post("/",authorizationMiddleware([EmployeeRole.HR]),  this.createDepartment.bind(this));
        router.get("/",this.getAllDepartments.bind(this));
        router.get("/:id",this.getDepartmentById.bind(this));
        router.put("/:id",authorizationMiddleware([EmployeeRole.HR]),this.updateDepartment.bind(this));
        router.delete("/:id", authorizationMiddleware([EmployeeRole.HR,EmployeeRole.UI]) , this.deleteDepartment.bind(this));

    }

    async createDepartment(req: Request, res: Response, next: NextFunction){
        try {
            const createDepartmentDto = plainToInstance(CreateDepartmentDto, req.body);
            const errors = await validate(createDepartmentDto);
            if (errors.length > 0) {
                console.log(JSON.stringify(errors));
                throw new HttpException(400, JSON.stringify(errors));
            }
            const savedDepartment = await this.departmentService.createDepartment(
                createDepartmentDto.name
            );
            res.status(201).send(savedDepartment);
        }
        catch (err) {
            console.log(err);
            next(err)

        }
    }

    async getAllDepartments(req: Request, res: Response,next: NextFunction) {
        console.log(req.user)
        const departments= await this.departmentService.getAllDepartments();
        res.status(200).send(departments);
    }

    async getDepartmentById(req: Request, res: Response, next: NextFunction) {
        try{
            const id = Number(req.params.id);
            const department = await this.departmentService.getDepartmentById(id);
            if (!department) {
                throw new HttpException(404,"Department not found");
                
            }
            res.status(200).send(department);
        }
        catch(err){
            console.log(err);
            next(err);
        }
    }

    async updateDepartment( req: Request, res: Response, next: NextFunction) {
        try{
        const updateDepartmentDto = plainToInstance(CreateDepartmentDto, req.body);
        const errors = await validate(updateDepartmentDto);
            if (errors.length > 0) {
                console.log(JSON.stringify(errors));
                throw new HttpException(400, JSON.stringify(errors));
            }
        const updatedDepartment=await this.departmentService.updateDepartment(
            Number(req.params.id),
            updateDepartmentDto.name
        );
        res.status(200).send(updatedDepartment);
    }
        catch (err) {
            console.log(err);
            next(err)

        }

    }

    async deleteDepartment(req: Request, res: Response, next: NextFunction){
        try{
        const id= Number(req.params.id);
        await this.departmentService.deleteDepartment(id);
        res.status(204).send();
        }
        catch(error){
            next(error)
        }
        
    }

}

export default DepartmentController;