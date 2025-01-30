import { Body, UseGuards, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('users')
export class UsersController {
    
    constructor(private usersService: UsersService) {}

    @Get('')
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    getAll(){
        return this.usersService.getAllUsers()
    }

    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return this.usersService.getOneUser(id)
    }

    @Post('')
    createUser(@Body() dto: CreateUserDto) {
        return this.usersService.createUser(dto)
    }
    @Put('')
    addCart(@Param('id') id:ObjectId, @Body() dish_id: ObjectId) {
        // return this.usersService.addDishInCart(id, dish_id)
    }
    @Delete(':id')
    deleteUser(@Param('id') id: ObjectId) {
        return this.usersService.deleteUser(id)
    }
    @Put(':id')
    addAdress(@Param('id') id: ObjectId, @Body() adress: string) {
        return this.usersService.addAdress(id, adress)
    }
    @Post(':id/roles')
    async assignRoleToUser(
        @Param('id') userId: string,
        @Body('role') roleName: string,
    ) {
        return this.usersService.assignRoleToUser(userId, roleName);
    }
}
