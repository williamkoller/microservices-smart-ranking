import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

export type PlayerDocument = Player & Document

@Schema()
export class Player {
  @Prop()
  _id: Types.ObjectId

  @Prop()
  name: string

  @Prop({ unique: true })
  email: string

  @Prop()
  tel: string

  @Prop()
  ranking: string

  @Prop()
  rankingPosition: string

  @Prop()
  imgUrl: string

  @Prop({ type: Types.ObjectId, ref: 'Category' })
  category: Types.ObjectId

  @Prop()
  createdAt: Date

  @Prop()
  updatedAt: Date
}

export const PlayerSchema = SchemaFactory.createForClass(Player)
