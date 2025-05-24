import { IsNotEmpty, IsNumber, IsString, MinLength, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class CreateDepartmentDto {

  @IsNotEmpty()
  @IsString()
  name: string;

}

