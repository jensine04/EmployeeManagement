import EmployeeRepository from "../repositories/employee.repository";
import HttpException from "../exception/httpException";
import DepartmentRepository from "../repositories/department.repository";
import Employee, { EmployeeRole , EmployeeStatus} from "../entities/employee.entity";
import Address from "../entities/address.entity";
import { LoggerService } from "./logger.service";
import { CreateAddressDto } from "../dto/create-address.dto";
import bcrypt from 'bcrypt';

class EmployeeService{
    constructor(private employeeRepository: EmployeeRepository,private departmentRepository:DepartmentRepository){}
    private logger=LoggerService.getInstance(EmployeeService.name)

    async createEmployee( email: string, name: string, age: number,  role:EmployeeRole,dept_id : number,employeeId :string ,experience: number,dateOfJoining: Date, STATUS: EmployeeStatus, address: CreateAddressDto, password:string) : Promise<Employee> {
        const newAddress=new Address();
        newAddress.line1=address.line1;
        newAddress.pincode=address.pincode;
        newAddress.line2=address.line2;
        newAddress.houseNo=address.houseNo;
        const newEmployee=new Employee();
        newEmployee.name=name;
        newEmployee.email=email;
        newEmployee.age=age;
        newEmployee.role=role;
        newEmployee.employeeId=employeeId;
        newEmployee.experience=experience;
        newEmployee.dateOfJoining=dateOfJoining;
        const dept=await this.departmentRepository.findOneById(dept_id)
        if(!dept){
            throw new HttpException(401,"Department Not Found to Add employee")
        }
        newEmployee.department=dept;
        newEmployee.STATUS=STATUS;
        newEmployee.address=newAddress;
        newEmployee.password=await bcrypt.hash(password,10);
        return this.employeeRepository.create(newEmployee);
    }
    
    async getAllEmployees(): Promise<Employee[]> {
        this.logger.info("Employes Found")
        return this.employeeRepository.findMany();
    }

    async getEmployeeById(id: number): Promise<Employee |null> {
        let employee= await this.employeeRepository.findOneById(id);
        if(!employee){
            throw new Error("Employee not found");
        }
        this.logger.info("Found Employee")
        return employee;
    }

    async getEmployeeByEmail(email: string): Promise<Employee> {
        this.logger.info("Found Employee")
        return this.employeeRepository.findByEmail(email);
    }

    async updateEmployee( id:number, email: string, name: string, age: number,  role:EmployeeRole, dept_id : number, employeeId :string ,experience: number, STATUS: EmployeeStatus,address: CreateAddressDto, password:string) : Promise<Employee> {
        this.logger.info("Updating Employee")
        const existingEmployee=await this.employeeRepository.findOneById(id) ;
        if (existingEmployee) {
            //const newAddress=new Address();
            const existingAddress=existingEmployee.address;
            existingAddress.line1=address.line1;
            existingAddress.pincode=address.pincode;
            existingAddress.line2=address.line2;
            existingAddress.houseNo=address.houseNo;
            const employee = new Employee();
            employee.name = name;
            employee.email = email;
            employee.age = age;
            employee.role = role;
            employee.employeeId = employeeId;
            employee.experience = experience;
            const dept=await this.departmentRepository.findOneById(dept_id)
            if(!dept){
                throw new HttpException(401,"Department Not Found to Update employee")
            }
            employee.department=dept;
            employee.STATUS = STATUS;
            employee.address = existingAddress;
            employee.password=await bcrypt.hash(password,10);
            await this.employeeRepository.update(id, employee);
            return employee;
        }
    }

    async deleteEmployee(id){
        const employee= await this.employeeRepository.findOneById(id);
        if (employee){
            this.logger.info("Deleting Employee")
            await this.employeeRepository.delete(id);
        }
    }

}

export default EmployeeService;