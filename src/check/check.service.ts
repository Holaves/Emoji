import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class CheckService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,){}
    async checkUserAuth(token) {
        const user = await this.userModel.findById(token.id)
        if(user){
            return user
        }
        else {
            throw new HttpException('Не удалось найти пользователя', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
