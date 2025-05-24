import DepartmentRepository from "../repositories/department.repository";
import Department from "../entities/department.entity";
import HttpException from "../exception/httpException";

class DepartmentService{
    constructor(private departmentRepository: DepartmentRepository){}

    async createDepartment(name:string) : Promise<Department> {
        const newDepartment= new Department();
        newDepartment.name=name;
        return this.departmentRepository.create(newDepartment)
    }

    async getAllDepartments(): Promise<Department[]> {
        return this.departmentRepository.findMany();
    }

    async getDepartmentById(id: number): Promise<Department |null> {
        let department= await this.departmentRepository.findOneById(id);
        if(!department){
            throw new Error("Department not found");
        }
        return department;
    }

    async updateDepartment( id:number, name: string) : Promise<Department> {
        const existingDepartment=await this.departmentRepository.findOneById(id) ;
        if (!existingDepartment) 
            throw new HttpException(400, "Department not found");
            
            const department = new Department();
            department.name = name;
            await this.departmentRepository.update(id, department);
            return department;
        
    }

    async deleteDepartment(id:number){
        const department= await this.departmentRepository.findOneById(id);
        if (department){
            await this.departmentRepository.delete(department);
        }
    }

}

export default DepartmentService;