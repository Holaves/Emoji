import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ObjectId } from "mongoose";

export class CreateDishDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    price: number;
    
    @IsNumber()
    weight?: number;

    @IsString()
    description: string;
        
    categoria: ObjectId;
}