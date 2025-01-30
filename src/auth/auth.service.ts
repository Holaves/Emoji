import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

        
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private userService: UsersService,
) {}
    
async login(dto: CreateUserDto) {
    const candidates = await this.userModel.find({ phone_number: dto.phone_number });
    if (candidates.length > 0) {
        return this.generateToken(candidates[0]); 
    }
    const newUser = await this.userService.createUser(dto);
    return this.generateToken(newUser);
}
  
private async generateToken(user: UserDocument | any) {
    // Получаем пользователя с его ролями
    const userWithRoles = await this.userModel.findById(user._id).populate('roles');
    
    const userObj = typeof userWithRoles.toObject === 'function' ? userWithRoles.toObject() : userWithRoles;

    // Здесь мы берем роли в виде массива строк (например, ['ADMIN', 'USER'])
    const payload = {
        phone_number: userObj.phone_number,
        id: userObj._id,
        roles: userObj.roles.map(role => role.name), // Это предполагает, что роли имеют поле `name`
    };

    const token = this.jwtService.sign(payload, {secret: 'SECRET'});
    return { token };
}
}
