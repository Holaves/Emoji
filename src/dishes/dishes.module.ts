import { Module } from '@nestjs/common';
import { DishesController } from './dishes.controller';
import { DishesService } from './dishes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Dish, DishSchema } from './schemas/dish.schema';
import { FileModule } from 'src/file/file.module';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { CategoriesModule } from 'src/categories/categories.module';
import { CategoriesService } from 'src/categories/categories.service';
import { Categoria, CategoriaSchema } from 'src/categories/schemas/categoria.schema';

@Module({
  controllers: [DishesController],
  providers: [DishesService],
  imports: [
    MongooseModule.forFeature([{name: Dish.name, schema: DishSchema}]),
    MongooseModule.forFeature([{name: Categoria.name, schema: CategoriaSchema}]),
    FileModule,
    JwtModule,
    CategoriesModule
  ],
})
export class DishesModule {}
