import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("login")
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto)
    }
    

    // @Post("/registration/activationCode")
    // registrationValidate(@Body() dto: ActivationDto) {
    //     return this.authService.registrationValidateCode(dto)
    // }
    // @Post("/registration/createUser")
    // registrationCreate(@Body() dto: CreateUserDto) {
    //     return this.authService.registrationCreateUser(dto)
    // }

    // @Post("logout")
    // logout() {

    // }
}
