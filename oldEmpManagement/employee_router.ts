import { Router} from "express";
import Employee from "./Employee";

const employeeRouter =Router();

let employees:Employee[] = [{
    id:1,
    name:"Employee 1",
    email:"employee1@gmail.com",
    createdAt:new Date(),
    updatedAt: new Date()
},
{
    id:2,
    name:"Employee 2",
    email:"employee2@gmail.com",
    createdAt:new Date(),
    updatedAt: new Date()
}
]

employeeRouter.get("/", (req,res) =>{
    res.status(200).send(employees);
    console.log("GET employees endpoint successfully executed");
})

employeeRouter.post("/", (req,res) =>{
    const name=req.body.name;
    const email=req.body.email;
    const employee=new Employee();
    employee.name=name;
    employee.email=email;
    employee.id=employees.length+1;
    employee.createdAt=new Date();
    employee.updatedAt=new Date();
    employees.push(employee);
    res.status(201).send("Employee Created")
})

employeeRouter.get("/:id",(req,res) => {
    const id=req.params.id;
    const employee=employees.find((emp) => emp.id == Number(id)  )
    res.status(200).send("Employee found:"+employee.name);
})

employeeRouter.put("/:id",(req,res) => {
    const id=req.params.id;
    res.status(200).send("Employee id:"+id+" updated by put")
})

employeeRouter.patch("/:id",(req,res) => {
    const id=req.params.id;
    res.status(200).send("Employee id:"+id +" updated by patch")
})

employeeRouter.delete("/:id",(req,res) => {
    const id=req.params.id;
    res.status(200).send("Employee "+id+" deleted")
})

export default employeeRouter;