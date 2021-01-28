import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { EventType } from '@/categories/types/event.type'

export type CategoryDocument = Category & Document

@Schema()
export class Category {
  @Prop()
  name: string

  @Prop()
  description: string

  @Prop()
  events: Array<EventType>

  @Prop({ type: Types.ObjectId, ref: 'Players' })
  players: Array<Types.ObjectId>
}

export const CategorySchema = SchemaFactory.createForClass(Category)
