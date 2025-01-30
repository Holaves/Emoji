import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from 'mongoose'
import { Categoria } from "src/categories/schemas/categoria.schema";

export type DishDocument = Dish & Document;


@Schema()
export class Dish {

    @Prop()
    name: string;

    @Prop()
    price: number;

    @Prop()
    picture: string;

    @Prop()
    weight: number;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Categoria'})
    categoria: Categoria;

    @Prop()
    description: string;
}

export const DishSchema = SchemaFactory.createForClass(Dish)