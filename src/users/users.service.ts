    import { Injectable, NotFoundException } from '@nestjs/common';
    import { InjectModel } from '@nestjs/mongoose';
    import { FileService } from 'src/file/file.service';
    import { Model, ObjectId } from 'mongoose';
    import { RolesService } from 'src/roles/roles.service';
    import { CreateUserDto } from './dto/create-user.dto';
    import { User, UserDocument } from './schemas/user.schema';
    import { Role, RoleDocument } from 'src/roles/schemas/role.schema';

    @Injectable()
    export class UsersService {

        constructor(
            @InjectModel(User.name) private userModel: Model<UserDocument>,
            private fileService: FileService,
            private roleService: RolesService,
            @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    ) {}

        async createUser(dto: CreateUserDto) {
            const user = await this.userModel.create({...dto, is_sms: false, cart: {dishes: [], isDelive: false}})
            const getRole = await this.roleService.getRoleByName("USER")
            if(dto.role){
                const getRole = await this.roleService.getRoleByName(dto.role)
                user.roles.push(getRole[0])
                await user.save()

                console.log(dto.role)
            }
            
            user.roles.push(getRole[0])

            await user.save()
            return user;
        }
        async getAllUsers() {
            const users = await this.userModel.find().populate('roles')
            return users;
        }
        async getOneUser(id: ObjectId){
            const user = await this.userModel.findById(id)
            return user;
        }
        async deleteUser(id: ObjectId){
            const user = await this.userModel.findByIdAndDelete(id)
            return user;
        }
        async getUserByEmail(phone_number: string) {
            const user = await this.userModel.find({phone_number: phone_number})
            return user[0];
        }
        async addAdress(id: ObjectId, adress: string){
            const user = await this.getOneUser(id)
            user.adress = adress
            user.save()
            return user
        }
        async assignRoleToUser(userId: string, roleName: string): Promise<User> {
            const user = await this.userModel.findById(userId);
            if (!user) {
                throw new NotFoundException('Пользователь не найден');
            }
        
            // Получаем роль, используя сервис ролей
            let role = await this.roleService.getRoleByName(roleName);
            if (!role || role.length === 0) {
                throw new NotFoundException('Роль не найдена');
            }
        
            const newRole = role[0]; // Берем первый элемент из результата
        
            // Проверяем, есть ли уже эта роль у пользователя
            const hasRole = user.roles.some((r) => r.toString() === newRole._id.toString());
            if (!hasRole) {
                user.roles.push(newRole);
                await user.save();
            }
        
            return user;
        }
    
    }
