import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: 0 })
    loginAttempts: number;

    @Prop({ type: Date, default: null })
    lockUntil: Date | null;

    @Prop({ type: Date, default: null })
    lastSession: Date | null;

    @Prop({ type: String, default: null })
    location: string | null;
}

export const UserSchema = SchemaFactory.createForClass(User);