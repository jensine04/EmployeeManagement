import express from "express";
import EmployeeRepository from "../repositories/employee.repository";
import DepartmentRepository from "../repositories/department.repository";
import datasource from "../db/data-source";
import Employee from "../entities/employee.entity";
import Department from "../entities/department.entity";
import EmployeeService from "../services/employee.service";
import EmployeeController from "../controllers/employee.controller";

const employeeRouter=express.Router();

const employeeRepository= new EmployeeRepository(datasource.getRepository(Employee));
const departmentRepository=new DepartmentRepository(datasource.getRepository(Department))
const employeeService = new EmployeeService(employeeRepository,departmentRepository);
const employeeController= new EmployeeController(employeeService,employeeRouter);

export {employeeService};
export default employeeRouter;


