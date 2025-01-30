import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from 'mongoose'
import { Cart } from "src/users/schemas/cart.shema";

export type OrderDocument = Order & Document;


@Schema()
export class Order {

    @Prop({required: true})
    phone_number: string;

    @Prop({required: true})
    cart: Cart

    @Prop()
    adress: string 

    @Prop({ default: Date.now }) 
    createdAt: Date;

    @Prop()
    dateTime: string

    @Prop({required: true})
    status: 'waiting' | 'inWay' | 'complete'

    @Prop({required: true})
    orderIndex: number;

    @Prop({required: true})
    delive: boolean;
    
    @Prop({required: true})
    fullPrice: number
}

export const OrderSchema = SchemaFactory.createForClass(Order)