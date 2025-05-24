import EmployeeRepository from "../repositories/employee.repository";
import Employee, { EmployeeRole } from "../entities/employee.entity";
import Address from "../entities/address.entity";
import { CreateAddressDto } from "../dto/create-address.dto";
import bcrypt from 'bcrypt';

class EmployeeService{
    constructor(private employeeRepository: EmployeeRepository){}

    async createEmployee( email: string, name: string, age: number,  role:EmployeeRole,address: CreateAddressDto, password:string) : Promise<Employee> {
        const newAddress=new Address();
        newAddress.line1=address.line1;
        newAddress.pincode=address.pincode;
        const newEmployee=new Employee();
        newEmployee.name=name;
        newEmployee.email=email;
        newEmployee.age=age;
        newEmployee.role=role;
        newEmployee.address=newAddress;
        newEmployee.password=await bcrypt.hash(password,10);
        return this.employeeRepository.create(newEmployee);
    }
    
    async getAllEmployees(): Promise<Employee[]> {
        return this.employeeRepository.findMany();
    }

    async getEmployeeById(id: number): Promise<Employee |null> {
        let employee= await this.employeeRepository.findOneById(id);
        if(!employee){
            throw new Error("Employee not found");
        }
        return employee;
    }

    async getEmployeeByEmail(email: string): Promise<Employee> {
        return this.employeeRepository.findByEmail(email);
    }

    async updateEmployee( id:number, email: string, name: string, age: number,  role:EmployeeRole,address: CreateAddressDto, password:string) : Promise<Employee> {
        const existingEmployee=await this.employeeRepository.findOneById(id) ;
        if (existingEmployee) {
            //const newAddress=new Address();
            const existingAddress=existingEmployee.address;
            existingAddress.line1=address.line1;
            existingAddress.pincode=address.pincode;
            const employee = new Employee();
            employee.name = name;
            employee.email = email;
            employee.age = age;
            employee.role = role;
            employee.address = existingAddress;
            employee.password=await bcrypt.hash(password,10);
            await this.employeeRepository.update(id, employee);
            return employee;
        }
    }

    async deleteEmployee(id){
        const employee= await this.employeeRepository.findOneById(id);
        if (employee){
            await this.employeeRepository.delete(id);
        }
    }

}

export default EmployeeService;