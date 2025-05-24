import {Column,  Entity, OneToOne, OneToMany, JoinColumn, ManyToOne} from "typeorm";
import AbstractEntity from "./abstract.entity";
import Address from "./address.entity";
import Department from "./department.entity";

export enum EmployeeRole {
  UI= 'UI',
  UX= 'UX',
  DEVELOPER= 'DEVELOPER',
  HR= 'HR'
}

export enum EmployeeStatus {
  ACTIVE= 'ACTIVE',
  INACTIVE= 'INACTIVE',
  PROBATION= 'PROBATION'
}

@Entity()
class Employee extends AbstractEntity{

    @Column({unique: true})
    email: string;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column()
    employeeId: string;

    @Column()
    experience: number;

    @Column()
    dateOfJoining: Date;

    @Column()
    password: string;

    @Column ({
      type: 'enum',
      enum:EmployeeStatus,
      default: EmployeeStatus.ACTIVE
    })
    STATUS: EmployeeStatus

    @Column ({
      type: 'enum',
      enum:EmployeeRole,
      default: EmployeeRole.DEVELOPER
    })
    role: EmployeeRole


    @OneToOne(() => Address, (address) => address.employee, {
   cascade: true
  })
  address: Address

    @ManyToOne(() => Department, (department) => department.employee)
      department: Department
  }
  
  export default Employee;