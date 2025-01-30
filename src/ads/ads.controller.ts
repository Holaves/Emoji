import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AdsService } from './ads.service';
import { ObjectId } from 'mongoose';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateAdDto } from './dto/create-ad.dto';

@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {
    
  }

  @Get('')
  getAll() {
    return this.adsService.getAllAds()
  }
  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.adsService.getOneAd(id)
  }
  @Delete(':id')
  deleteOne(@Param('id') id: ObjectId) {
    return this.adsService.deleteOneAd(id)
  }
  @Post('')
  @UseInterceptors(FileFieldsInterceptor([
        {name: 'picture', maxCount: 1},
    ]))
  create(@Body() dto: CreateAdDto, @UploadedFiles() files){
      const picture = files.picture ? files.picture[0] : null;
      if (!picture) {
          throw new HttpException('Файл не загружен', HttpStatus.BAD_REQUEST); // Обработка ошибки
      }
    return this.adsService.createAd(dto, picture)
  }
}
