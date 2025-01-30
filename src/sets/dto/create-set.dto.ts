import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Dish } from "src/dishes/schemas/dish.schema";

export class CreateSetDto{

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    price: number;

    @IsNumber()
    weight?: number;
    dishes: Dish[]
}