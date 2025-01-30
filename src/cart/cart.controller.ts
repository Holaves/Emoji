import { Body, Controller, Delete, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { ObjectId } from 'mongoose';
import { Request } from 'express';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly jwtService: JwtService
  ) {}

  @Roles("USER")
  @UseGuards(RolesGuard)
  @Get('')
  getCart(@Req() req: Request) {
    const token = req.headers.authorization?.split(' ')[1]; 
    if (!token) {
      throw new Error('Authorization token is missing');
    }
    const verifyToken = this.jwtService.verify(token);
    return this.cartService.getCart(verifyToken);
  }

  @Post('')
  addToCart(@Req() req: Request, @Body() DishID: ObjectId) {
    const token = req.headers.authorization?.split(' ')[1]; 
    if (!token) {
      throw new Error('Authorization token is missing');
    }
    const verifyToken = this.jwtService.verify(token, {secret: 'SECRET'});
    return this.cartService.addDishInCart(verifyToken, DishID);
  }
  @Delete('')
  deleteDish(@Req() req: Request, @Body('DishId') DishId: ObjectId) {
    console.log(req.body)
    const token = req.headers.authorization?.split(' ')[1]; 
    if (!token) {
      throw new Error('Authorization token is missing');
    }
    const verifyToken = this.jwtService.verify(token, {secret: 'SECRET'});
    return this.cartService.deleteDishFromCart(verifyToken, DishId)
  }
  @Put('/quantity/increment')
  incrementQuantity(@Req() req: Request, @Body('DishId') DishId: ObjectId){
    const token = req.headers.authorization?.split(' ')[1]; 
    if (!token) {
      throw new Error('Authorization token is missing');
    }
    const verifyToken = this.jwtService.verify(token, {secret: 'SECRET'});
    return this.cartService.incrementQuantity(DishId, verifyToken)
  }
  @Put('/quantity/decrement')
  decrementQuantity(@Req() req: Request, @Body('DishId') DishId: ObjectId){
    const token = req.headers.authorization?.split(' ')[1]; 
    if (!token) {
      throw new Error('Authorization token is missing');
    }
    const verifyToken = this.jwtService.verify(token, {secret: 'SECRET'});
    return this.cartService.decrementQuantity(DishId, verifyToken)
  }
}