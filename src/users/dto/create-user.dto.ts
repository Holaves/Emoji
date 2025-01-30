import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class CreateUserDto {

    phone_number: string;

    chatId: string;
    @IsString()
    role?: string;
}