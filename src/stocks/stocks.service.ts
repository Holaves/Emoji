import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Stock, StockDocument } from './schemas/stock.schema';
import { CreateStockDto } from './dto/create-stock.dto';
import { FileService, FileType } from 'src/file/file.service';

@Injectable()
export class StocksService {

    constructor(@InjectModel(Stock.name) private stockModel: Model<StockDocument>,
    private fileService: FileService,){}


    async getAllStocks() {
        const stocks = await this.stockModel.find() 
        return stocks
    }

    async getOneStock(id: ObjectId) {
        const stock = await this.stockModel.findById(id)
        return stock
    }

    async createStock(dto: CreateStockDto, picture) {
        const picturePath = picture.originalname ? this.fileService.createFile(FileType.IMAGE, picture) : picture

        const stock = await this.stockModel.create({...dto, picture: picturePath})
        return stock
    }

    async deleteOneStock(id: ObjectId){
        const stock = await this.stockModel.findByIdAndDelete(id)
        return stock
    }


}
