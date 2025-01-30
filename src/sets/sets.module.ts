import { Module } from '@nestjs/common';
import { SetsService } from './sets.service';
import { SetsController } from './sets.controller';
import { FileModule } from 'src/file/file.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Dish, DishSchema } from 'src/dishes/schemas/dish.schema';
import { SetSchema } from './schemas/set.schema';

@Module({
  controllers: [SetsController],
  providers: [SetsService],
  imports: [
    MongooseModule.forFeature([{name: Set.name, schema: SetSchema}]),
    MongooseModule.forFeature([{name: Dish.name, schema: DishSchema}]),
    FileModule,
  ]
})
export class SetsModule {}
