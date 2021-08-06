import { Category } from '@/modules/categories/interfaces/category.interface'
import { Document } from 'mongoose'

export interface Player extends Document {
  name: string
  email: string
  tel: string
  category: Category
  imgUrl: string
  ranking: string
  rankingPosition: number
}
