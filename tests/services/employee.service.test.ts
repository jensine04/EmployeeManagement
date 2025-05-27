import {when} from 'jest-when'
import {mock, MockProxy} from 'jest-mock-extended';
import EmployeeRepository from "../../repositories/employee.repository";
import EmployeeService from '../../services/employee.service';
import Employee from '../../entities/employee.entity';
import DepartmentRepository from '../../repositories/department.repository';


describe('EmployeeService',() => {

    let employeeRepository: MockProxy<EmployeeRepository>;
    let departmentRepository: MockProxy<DepartmentRepository>;
    let employeeService: EmployeeService;
    beforeEach(()=> {
        employeeRepository= mock<EmployeeRepository>();
        departmentRepository=mock<DepartmentRepository>();
        employeeService= new EmployeeService(employeeRepository,departmentRepository);
    })

    describe('getEmployeeById', ()=> {

        it('should return value when employee with given id exists',async() => {
            const mockEmployee={id: 1, name:"abc"} as Employee
            when(employeeRepository.findOneById).calledWith(1).mockReturnValue(mockEmployee );
            const result=await employeeService.getEmployeeById(1);
            expect(result).toStrictEqual(mockEmployee);
            expect(employeeRepository.findOneById).toHaveBeenCalledWith(1);
        });

        it('should throw error when employee with given id does not exist',async() => {
            const mockEmployee={id: 1, name:"abc"} as Employee
            when(employeeRepository.findOneById).calledWith(2).mockReturnValue(null );
            expect(employeeService.getEmployeeById(2)).rejects.toThrow("Employee not found");
            expect(employeeRepository.findOneById).toHaveBeenCalledWith(2);
        });
    })

     describe("Get all employess",()=>{
        it("All data in the database",async()=>{    
            const mockEmployeeArr=[{id:1,name:"Nevin"},{id:2,name:"Vidhu"}] as Employee[];
            when(employeeRepository.findMany).calledWith().mockReturnValue(mockEmployeeArr)
            const result=await employeeService.getAllEmployees()
            expect(employeeRepository.findMany).toHaveBeenCalled()
            expect(result).toStrictEqual(mockEmployeeArr)
        })
        it("No employee in the database --error",async()=>{
                const mockEmployeeArr=[] as Employee[]
                when(employeeRepository.findMany).calledWith().mockReturnValue(mockEmployeeArr)
                expect(employeeService.getAllEmployees).toHaveLength(0)
        })
    })
})