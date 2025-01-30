import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from 'mongoose'
import { Dish } from "src/dishes/schemas/dish.schema";
import { Role } from "src/roles/schemas/role.schema";

export type CartDocument = Cart & Document;

Schema()
export class CartDish {
    
    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Dish'}]})
    dish: Dish
    
    @Prop()
    quantity: number
    
    @Prop({required: false})
    _id: mongoose.Schema.Types.ObjectId;

}


@Schema()
export class Cart {
    
    @Prop()
    dishes: CartDish[]
    
    @Prop()
    isDelive: boolean


}

export const CartSchema = SchemaFactory.createForClass(Cart)