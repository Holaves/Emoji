import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { Dish, DishSchema } from 'src/dishes/schemas/dish.schema';

@Module({
  controllers: [CartController],
  providers: [CartService],
  imports: [
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
        MongooseModule.forFeature([{name: Dish.name, schema: DishSchema}]),
        JwtModule,
        AuthModule
  ]
})
export class CartModule {}
