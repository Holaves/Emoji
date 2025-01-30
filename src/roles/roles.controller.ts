import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('roles')
export class RolesController {
    
    constructor(private rolesService: RolesService) {}

    @Get('')
    getAll() {
        return this.rolesService.getAllRoles()
    }

    @Get(':value')
    getByName(@Param("value") value: string) {
        return this.rolesService.getRoleByName(value)
    }
    @Post('')
    create(@Body() dto: CreateRoleDto) {
        return this.rolesService.createRole(dto)
    }

}
