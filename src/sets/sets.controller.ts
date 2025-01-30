import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { SetsService } from './sets.service';
import { ObjectId } from 'mongoose';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateSetDto } from './dto/create-set.dto';

@Controller('sets')
export class SetsController {
  constructor(private readonly setsService: SetsService) {}

  @Get('')
  getAll(){
    return this.setsService.getAllSets()
  }

  @Get('/categories/:id')
  getByCategoria(@Param('id') id: ObjectId) {
    return this.setsService.getSetsByCategoriaID(id)
  }

  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.setsService.getOneSet(id)
  } 

  @Post('')
  @UseInterceptors(FileFieldsInterceptor([
    {name: 'picture', maxCount: 1},
]))
  create(@Body() dto: CreateSetDto, @UploadedFiles() files){
    const picture = files.picture ? files.picture[0] : null;
    if (!picture) {
        throw new HttpException('Файл не загружен', HttpStatus.BAD_REQUEST);
    }
    return this.setsService.createSet(dto, picture)
  }

  @Put(':id')
  @UseInterceptors(FileFieldsInterceptor([
    {name: 'picture', maxCount: 1},
]))
  update(@Param('id') id: ObjectId, @Body() dto: CreateSetDto, @UploadedFiles() files?){
    const picture = files.picture ? files.picture[0] : null;
   
    return this.setsService.updateSet(id,dto, picture)
  }

  @Delete(':id')
  deleteSet(@Param('id') id: ObjectId){
    return this.setsService.deleteOneSet(id)
  }
}
