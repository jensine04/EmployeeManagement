import { isDate, IsEmail, IsEnum, IsPositive, IsNotEmpty, IsNumber, IsDate, IsString, MinLength, ValidateNested, IsDateString } from "class-validator";
import { Type } from "class-transformer";
import { CreateAddressDto } from "./create-address.dto";
import { EmployeeRole, EmployeeStatus } from "../entities/employee.entity";

export class CreateEmployeeDto {
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
  @IsPositive()
  experience: number;

  @IsNotEmpty()
  @IsNumber()
  departmentId: number;

  @IsNotEmpty()
  @IsDateString()
  dateOfJoining: Date;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  password: string;

  @IsEnum(EmployeeRole)
  role: EmployeeRole

  @IsEnum(EmployeeStatus)
  status: EmployeeStatus

  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}