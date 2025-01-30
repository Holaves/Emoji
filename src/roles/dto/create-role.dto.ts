import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {

    @IsString()
    @IsNotEmpty()
    readonly name: string;
    
    @IsString()
    readonly description: string;
}