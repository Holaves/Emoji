import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from 'mongoose'
import { Categoria } from "src/categories/schemas/categoria.schema";

export type StockDocument = Stock & Document;


@Schema()
export class Stock {

    @Prop()
    name: string;

    @Prop()
    text: string

    @Prop()
    picture: string
}

export const StockSchema = SchemaFactory.createForClass(Stock)