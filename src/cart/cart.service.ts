import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId } from 'mongoose';
import { Dish, DishDocument } from 'src/dishes/schemas/dish.schema';
import { CartDish } from 'src/users/schemas/cart.shema';
import { User, UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class CartService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
                @InjectModel(Dish.name) private dishModel: Model<DishDocument>                
){}
    async getCart(token) {
        const user = await this.userModel.findById(token.id)
        if(user){
            return user.cart
        }
        else {
            throw new HttpException('Не удалось найти пользователя', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    async addDishInCart(token, dishId: ObjectId){
        const user = await this.userModel.findById(token.id)
        //@ts-ignore
        const dish = await this.dishModel.findById(dishId.DishId)
        if(user && dishId){
            const dishObject: CartDish = {dish: dish, quantity: 1, _id: dish.id}
            user.cart.dishes.push(dishObject)
            await user.save()
            return user.cart
        }
        else {
            throw new HttpException('Не удалось найти пользователя или блюдо', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    async deleteDishFromCart(token, dishId: ObjectId) {
        const user = await this.userModel.findById(token.id);
        if (!user) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    
        const dishIndex = user.cart.dishes.findIndex((item) => item._id === dishId);
        if (dishIndex === -1) {
          throw new HttpException('Dish not found in cart', HttpStatus.NOT_FOUND);
        }
    
        user.cart.dishes.splice(dishIndex, 1);
        await user.save();
        return user;
      }
      async incrementQuantity(id: ObjectId, token) {
        const user = await this.userModel.findById(token.id);
        
        if (!user) {
            throw new Error('User not found');
        }
        const dishInCart = user.cart.dishes.find(dish => dish._id === id);

        if (dishInCart) {
            dishInCart.quantity = dishInCart.quantity + 1;
        }
        const newUser = await this.userModel.findByIdAndUpdate(token.id, {...user})
        return newUser
    }
      async decrementQuantity(id: ObjectId, token?){
        const user = await this.userModel.findById(token.id);
        if (!user) {
            throw new Error('User not found');
        }
        const dishInCart = user.cart.dishes.find(dish => dish._id === id);
        if (dishInCart) {
            if(dishInCart.quantity <= 1){
                return await this.deleteDishFromCart(token, id)
            }
            //@ts-ignore
            dishInCart.quantity -= 1;
        }
        const newUser = await this.userModel.findByIdAndUpdate(token.id, {...user})
        return newUser
      }
}
