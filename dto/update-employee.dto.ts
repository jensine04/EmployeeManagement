import { IsEmail, IsEnum, isNotEmpty,IsPositive, IsNotEmpty, IsNumber, IsString, MinLength, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateAddressDto } from "./create-address.dto";
import { EmployeeRole , EmployeeStatus} from "../entities/employee.entity";

export class UpdateEmployeeDto{
    
      @IsNotEmpty()
      @IsEmail()
      email: string;
    
      @IsNotEmpty()
      @IsString()
      name: string;
    
      @IsNotEmpty()
      @IsNumber()
      age: number;

      @IsNotEmpty()
  @IsString()
  employeeId: string;

      @IsNotEmpty()
    @IsNumber()
     experience: number;

     @IsNotEmpty()
  @IsNumber()
  departmentId: number;
    
      @IsNotEmpty()
      @IsString()
      @MinLength(5)
      password: string;
    
      @IsEnum(EmployeeRole)
      role: EmployeeRole

      @IsEnum(EmployeeStatus)
      status: EmployeeStatus;
    
      @ValidateNested()
      @Type(() => CreateAddressDto)
      address: CreateAddressDto;
}