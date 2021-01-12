import { Document } from 'mongoose'
import { Category } from 'src/categories/types/category.type'

export type Player = PlayerDocument

export interface PlayerDocument extends Document {
  name: string
  email: string
  phoneNumber: number
  ranking: string
  rankingPosition: number
  urlPhotoPlayer: string
  category: Category
}
