import express from "express";
import Employee from "./entities/employee.entity";
import datasource from "./db/data-source";
import { Repository } from "typeorm";

const employeeRouter = express.Router();
let count = 2;

employeeRouter.get("/", async (req, res) => {
  const employeeRepository = datasource.getRepository(Employee);
  const employees =await employeeRepository.find();
  res.status(200).send(employees);
});

employeeRouter.get("/:id", async(req, res) => {
  const empId = Number(req.params["id"]);
  const employeeRepository = datasource.getRepository(Employee);
  const employee =await employeeRepository.findOneBy({id: empId});
  // const employee = employees.find((emp) => emp.id === empId);
  // if (!employee) {
  //   res.status(404).send("Employee not found");
  //   return;
  // }
  res.status(200).send(employee); 
});

employeeRouter.post("/", async (req, res) => {
  console.log(req.body);
  const employeeRepository = datasource.getRepository(Employee);
  const newEmployee = new Employee();
  newEmployee.email = req.body.email;
  newEmployee.name = req.body.name;
  await employeeRepository.insert(newEmployee);
  //await employeeRepository.save(newEmployee);
  res.status(201).send(newEmployee);
});

employeeRouter.delete("/:id", async(req, res) => {
  const empId = Number(req.params.id);
  const employeeRepository = datasource.getRepository(Employee);
  const employee =await employeeRepository.delete(empId)
  res.status(204).send(employee);
});

employeeRouter.put("/:id", async(req, res) => {
  const employeeRepository = datasource.getRepository(Employee);
  const empId = Number(req.params.id);
  const employee= await employeeRepository.update(empId, { name: req.body.name , email: req.body.email })
  res.status(200).send(employee);
});

employeeRouter.patch("/:id", async(req, res) => {
  const employeeRepository = datasource.getRepository(Employee);
  const empId = Number(req.params.id);
  const employee= await employeeRepository.update(empId, { name: req.body.name  })
  res.status(200).send(employee);
});

export default employeeRouter;
