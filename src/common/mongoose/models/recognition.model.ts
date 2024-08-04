import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CommonModel } from './common/common.model';

export type RecognitionDocument = Recognition & Document;

@Schema({ timestamps: true })
export class Recognition extends CommonModel {
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  architecture: string;
}

export const RecognitionSchema = SchemaFactory.createForClass(Recognition);
