import { Document } from 'mongoose'
import { ICategory } from '@/categories/interfaces/category.interface'

export interface IPlayer extends Document {
  name: string
  email: string
  tel: string
  category: ICategory
}
