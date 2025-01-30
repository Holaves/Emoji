import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CategoriesService } from './categories.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('categories')
export class CategoriesController {

    constructor(private categoriesService: CategoriesService){}

    @Get('')
    getAll() {
        return this.categoriesService.getAllCategories()
    }

    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return  this.categoriesService.getOneCategoria(id)
    }

    @Post('')
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'picture', maxCount: 1}
    ]))
    create(@Body() dto: CreateCategoriaDto, @UploadedFiles() files?) {
        const picture = files.picture ? files.picture[0] : null;

        console.log(dto)
        if (!picture) {
            // throw new HttpException('Файл не загружен', HttpStatus.BAD_REQUEST); // Обработка ошибки
        }
        return this.categoriesService.createCategoria(dto, picture)
    }

    
    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return  this.categoriesService.deleteCategoria(id)

    }
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'picture', maxCount: 1}
    ]))
    @Put(':id')
    updateCategoria(@Param('id') id: ObjectId, @Body() dto: CreateCategoriaDto, @UploadedFiles() files?){
        const picture = files.picture ? files.picture[0] : null;

        return this.categoriesService.updateCategoria(id, dto, picture)
    }
}
