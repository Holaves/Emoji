import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { MongooseModule } from '@nestjs/mongoose'
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path'
import { ConfigModule } from '@nestjs/config';
import { DishesModule } from './dishes/dishes.module';
import { CategoriesService } from './categories/categories.service';
import { CategoriesModule } from './categories/categories.module';
import { PaymentModule } from './payment/payment.module';
import { StocksModule } from './stocks/stocks.module';
import { SetsModule } from './sets/sets.module';
import { AdsModule } from './ads/ads.module';
import { AppController } from './app.controller';
import { TelegramModule } from './telegram/telegram.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';
import { CartModule } from './cart/cart.module';
import { JwtModule } from '@nestjs/jwt';
import { CheckModule } from './check/check.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
  }),
  JwtModule.register({
        secret: 'SECRET',
        signOptions: {
          expiresIn: '72h'
        }
      }),
  
    MongooseModule.forRoot(`mongodb+srv://holaves228:Good55555@cluster0.v51ss.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`),
    ServeStaticModule.forRoot({rootPath: path.join(__dirname, '/static')}),
    UsersModule,
    AuthModule,
    RolesModule,
    DishesModule,
    CategoriesModule,
    PaymentModule,
    StocksModule,
    SetsModule,
    AdsModule,
    TelegramModule,
    CartModule,
    CheckModule,
    OrdersModule
  ],
  controllers: [AppController],
  providers: [ {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },],
  
})
export class AppModule {}
