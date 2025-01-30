import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role, RoleDocument } from './schemas/role.schema';

@Injectable()
export class RolesService {
    
    constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

    async getRoleByName(value: string) {
        const role = await this.roleModel.find({"name": value})
        return role;
    }

    async getAllRoles() {
        const roles = await this.roleModel.find()
        return roles;
    }

    async createRole(dto: CreateRoleDto) {
        const role = await this.roleModel.create({...dto});
        return role;
    }
}
