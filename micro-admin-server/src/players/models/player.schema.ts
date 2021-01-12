import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

export type PlayerDocument = Player & Document

@Schema()
export class Player {
  @Prop()
  phoneNumber: string

  @Prop({ unique: true })
  email: string

  @Prop()
  name: string

  @Prop()
  ranking: string

  @Prop()
  rankingPosition: number

  @Prop()
  imgUrl: string

  @Prop({ type: Types.ObjectId, ref: 'Category' })
  category: Types.ObjectId
}

export const PlayerSchema = SchemaFactory.createForClass(Player)
