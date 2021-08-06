import { Document } from 'mongoose'
import { Category } from '@/modules/categories/interfaces/category.interface'

export interface Player extends Document {
  name: string
  email: string
  tel: string
  category: Category
  imgUrl: string
  ranking: string
  rankingPosition: string
}
