import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from 'mongoose'

export type RoleDocument = Role & Document;

@Schema()
export class Role {
    @Prop()
    name: string;

    @Prop()
    description: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role)