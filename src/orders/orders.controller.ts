import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ObjectId } from 'mongoose';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService,
              private readonly jwtService: JwtService,
  ) {
    
  }
  @Get('')
  getAll(){
    return this.ordersService.getOrders()
  }
  @Get(':id')
  getOne(@Param('id') id: ObjectId){
    return this.ordersService.getOneOrder(id)
  }

  @Delete(':id')
  deleteOne(@Param('id') id: ObjectId){
    return this.ordersService.deleteOneOrder(id)
  }
  @Put(':id')
  changeStatus(@Param('id') id: ObjectId, @Body('status') status: 'waiting' | 'inWay' | 'complete'){
    return this.ordersService.changeOrderStatus(id, status)
  }
  @Post('')
  create(@Body() dto: CreateOrderDto, @Req() req: Request){
    const token = req.headers.authorization?.split(' ')[1]; // Extract Bearer token
    if (!token) {
      return this.ordersService.createOrderNotAuth(dto)
    }
    const verifyToken = this.jwtService.verify(token, {secret: 'SECRET'});
    return this.ordersService.createOrder(dto, verifyToken)
  }
}
