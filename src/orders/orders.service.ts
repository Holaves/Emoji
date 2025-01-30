import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { Order, OrderDocument } from './schemas/order.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class OrdersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
                @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
                private readonly usersService: UsersService){}

    async getOrders(){
        const orders = await this.orderModel.find()
        return orders
    }
    async getOneOrder(id: ObjectId){
        const order = await this.orderModel.findById(id)
        return order
    }
    async deleteOneOrder(id: ObjectId){
        const order = await this.orderModel.findByIdAndDelete(id)
        return order
    }
    async createOrderNotAuth(dto: CreateOrderDto){
        let bool = true;
        let randomIndex: number;
    
        while (bool) {
            randomIndex = Math.floor(1000 + Math.random() * 9000);
            const existingOrder = await this.orderModel.findOne({ orderIndex: randomIndex });
            if (!existingOrder) {
                bool = false;
            }
        }
        const fullPrice = dto.cart.dishes.reduce((sum, cartDish) => {
            return sum + cartDish.dish.price * cartDish.quantity;
        }, 0);
        const order = await this.orderModel.create({
            adress: dto.adress,
            phone_number: dto.phone_number,
            cart: dto.cart,
            delive: dto.delive ? dto.delive : false,
            status: 'waiting',
            orderIndex: randomIndex,
            fullPrice: fullPrice, })
        return order;
    }
    async createOrder(dto: CreateOrderDto, token) {
        const user = await this.userModel.findById(token.id);
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST);
        }
        const newUser = await this.usersService.addAdress(token.id, dto.adress);
    
        let bool = true;
        let randomIndex: number;
    
        while (bool) {
            randomIndex = Math.floor(1000 + Math.random() * 9000);
            const existingOrder = await this.orderModel.findOne({ orderIndex: randomIndex });
            if (!existingOrder) {
                bool = false;
            }
        }
    
        const fullPrice = newUser.cart.dishes.reduce((sum, cartDish) => {
            return sum + cartDish.dish.price * cartDish.quantity;
        }, 0);
    
        const newOrder = await this.orderModel.create({
            adress: newUser.adress,
            phone_number: newUser.phone_number,
            cart: newUser.cart,
            dateTime: dto.dateTime,
            delive: dto.delive ? dto.delive : false,
            status: 'waiting',
            orderIndex: randomIndex,
            fullPrice: fullPrice, 
        });
    
        return newOrder;
    }
    
    async changeOrderStatus(id:ObjectId, status: 'waiting' | 'inWay' | 'complete' ){
        const order = await this.orderModel.findByIdAndUpdate(id, {status: status})
        return order
    }
}
