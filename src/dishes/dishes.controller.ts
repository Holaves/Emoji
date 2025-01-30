import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { DishesService } from './dishes.service';
import { ObjectId } from 'mongoose';
import { CreateDishDto } from './dto/create-dish.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('dishes')
export class DishesController {

    constructor(private dishesService: DishesService) {}
    
    @Get('')
    getAll(){
        return this.dishesService.getAllDishes()
    }

    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return this.dishesService.getOneDish(id)
    }

    @Get('/categories/:id')
    getByCategoria(@Param('id') id: ObjectId) {
        return this.dishesService.getDishesByCategoriaID(id)
    }


    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('')
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'picture', maxCount: 1},
    ]))
    create(@Body() dto: CreateDishDto, @UploadedFiles() files) {
        const picture = files.picture ? files.picture[0] : null;
    
        if (!picture) {
            throw new HttpException('Файл не загружен', HttpStatus.BAD_REQUEST); // Обработка ошибки
        }
        return this.dishesService.createDish(dto, picture)
    }
    
    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.dishesService.deleteDish(id)
    }

    @Put(':id')
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'picture', maxCount: 1},
    ]))
    update(@Param('id') id: ObjectId, @Body() dto: CreateDishDto, @UploadedFiles() files?) {
        const picture = files.picture ? files.picture[0] : null;

        return this.dishesService.updateDish(id, dto, picture)
    }
}
