import { ICategory } from '@/categories/interfaces/category.interface'

export class UpdatePlayerDto {
  id?: string
  category?: ICategory
  igmUrl?: string
}
