import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { ObjectId } from 'mongoose';
import { CreateStockDto } from './dto/create-stock.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {
    
  }

  @Get('')
  getAll(){
    return this.stocksService.getAllStocks()
  }

  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.stocksService.getOneStock(id)
  } 

  @Post('')
  @UseInterceptors(FileFieldsInterceptor([
      {name: 'picture', maxCount: 1},
  ]))
  create(@Body() dto: CreateStockDto, @UploadedFiles() files){
    const picture = files.picture ? files.picture[0] : null;
    if (!picture) {
        throw new HttpException('Файл не загружен', HttpStatus.BAD_REQUEST);
    }
    return this.stocksService.createStock(dto, picture)
  }

  @Delete(':id')
  deleteStock(@Param('id') id: ObjectId){
    return this.stocksService.deleteOneStock(id)
  }

}
