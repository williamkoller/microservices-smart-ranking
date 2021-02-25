import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { EventType } from '@/categories/types/event.type'

export type CategoryDocument = Category & Document

@Schema()
export class Category {
  @Prop()
  category: string

  @Prop()
  description: string

  @Prop()
  events: EventType[]

  @Prop()
  createdAt: Date

  @Prop()
  updatedAt: Date
}

export const CategorySchema = SchemaFactory.createForClass(Category)
