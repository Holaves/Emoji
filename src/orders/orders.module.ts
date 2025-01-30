import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { Order, OrderSchema } from './schemas/order.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    JwtModule,
    UsersModule,
        MongooseModule.forFeature([{name: Order.name, schema: OrderSchema}]),  
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}])  
    
  ]
})
export class OrdersModule {}
