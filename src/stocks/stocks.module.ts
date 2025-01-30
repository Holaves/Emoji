import { Module } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { StocksController } from './stocks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Stock, StockSchema } from './schemas/stock.schema';
import { FileModule } from 'src/file/file.module';

@Module({
  controllers: [StocksController],
  providers: [StocksService],

  imports: [
    MongooseModule.forFeature([{name: Stock.name, schema: StockSchema}]),
    FileModule
  ]
})
export class StocksModule {}
