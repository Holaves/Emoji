import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from 'mongoose'
import { Categoria } from "src/categories/schemas/categoria.schema";
import { Dish } from "src/dishes/schemas/dish.schema";

export type SetDocument = Set & Document;


@Schema()
export class Set {

    @Prop()
    name: string;

    @Prop()
    price: number;

    @Prop()
    picture: string;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Dish'}]})
    dishes: Dish[]

    @Prop()
    weight: number;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Categoria'}]})
    categoria: Categoria

    @Prop()
    description: string;
}

export const SetSchema = SchemaFactory.createForClass(Set)