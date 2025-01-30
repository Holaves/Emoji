import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoriaDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    subName?: string;

    @IsString()
    inBrackets?: string;
}