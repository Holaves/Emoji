import { IsBoolean, IsString } from "class-validator";
import { Cart } from "src/users/schemas/cart.shema";

export class CreateOrderDto {
    @IsString()
    phone_number: string

    @IsString()
    adress: string

    @IsBoolean()
    delive: boolean;

    dateTime: string
    
    cart: Cart

}