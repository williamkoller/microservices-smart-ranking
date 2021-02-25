import { Document } from 'mongoose'
import { Category } from '@/categories/interfaces/category.interface'

export type Player = Document

export interface PlayerDocument extends Document {
  name: string
  email: string
  tel: string
  category: Category
  imgUrl: string
}
