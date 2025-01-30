import { forwardRef, Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Dish, DishSchema } from 'src/dishes/schemas/dish.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { DishesModule } from 'src/dishes/dishes.module';
import { Categoria, CategoriaSchema } from './schemas/categoria.schema';
import { FileModule } from 'src/file/file.module';
import { Set, SetSchema } from 'src/sets/schemas/set.schema';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
  imports: [
    MongooseModule.forFeature([{name: Dish.name, schema: DishSchema}]),
    MongooseModule.forFeature([{name: Categoria.name, schema: CategoriaSchema}]),
    MongooseModule.forFeature([{name: Set.name, schema: SetSchema}]),
    
    forwardRef(() => DishesModule),
    FileModule
  ],
})
export class CategoriesModule {}
