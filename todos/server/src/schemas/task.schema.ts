import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
})
export class Task {
  @Prop({
    unique: true,
    required: true,
    trim: true,
  })
  title: string;

  @Prop({
    // required: true,
    trim: true,
  })
  description: string;

  @Prop({
    default: false,
  })
  done: boolean;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  user: User;
}

export const taskSchema = SchemaFactory.createForClass(Task);
