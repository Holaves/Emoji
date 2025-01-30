import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from 'mongoose'
import { Role } from "src/roles/schemas/role.schema";
import { Cart } from "./cart.shema";

export type UserDocument = User & Document;



@Schema()
export class User {
    

    @Prop({unique: true})
    phone_number: string;

    @Prop()
    adress: string;

    @Prop()
    chatId: string;

    @Prop()
    name: string;

    @Prop()
    cart: Cart

    @Prop()
    picture: string;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Role'}]})
    roles: Role[]
}

export const UserSchema = SchemaFactory.createForClass(User)