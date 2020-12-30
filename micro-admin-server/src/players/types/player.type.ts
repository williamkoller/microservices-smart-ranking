import { Document } from 'mongoose'

export type Player = PlayerDocument

export interface PlayerDocument extends Document {
  name: string
  email: string
  phoneNumber: string
  ranking: string
  rankingPosition: number
  urlPhotoPlayer: string
}
