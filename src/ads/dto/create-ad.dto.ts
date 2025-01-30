import { IsNumber, IsString } from "class-validator";

export class CreateAdDto {
    @IsString()
    name: string;

    @IsString()
    text: string;

    vrema: number;
}