import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsString } from "class-validator";
import { Document } from "mongoose";
import * as mongoose from 'mongoose'
import { Categoria } from "src/categories/schemas/categoria.schema";

export type AdDocument = Ad & Document;


@Schema({timestamps: true })
export class Ad {

    @IsString()
    @Prop()
    name: string;

    @Prop()
    picture: string;

    @IsString()
    @Prop()
    text: string


    @Prop({ default: Date.now }) 
    createdAt: Date;

    @Prop({ required: false })
    expiresAt?: Date; 
}



export const AdSchema = SchemaFactory.createForClass(Ad)

AdSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // Устанавливаем TTL на 1 час