import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from 'mongoose'
import { Dish } from "src/dishes/schemas/dish.schema";
import { Set } from "src/sets/schemas/set.schema";

export type CategoriaDocument = Categoria & Document;

export type component = {
    name: string;
    isExclude: boolean;
}

@Schema()
export class Categoria {
    
    @Prop()
    name: string

    @Prop()
    subName: string

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Dish'}]})
    dishes: Dish[]

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Set'}]})
    sets: Set[]

    @Prop()
    picture: string;

    @Prop()
    inBrackets: string

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Categoria' }] })
    subCategories: Categoria[];
}   

export const CategoriaSchema = SchemaFactory.createForClass(Categoria)