import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { ICategory } from '@/categories/interfaces/category.interface'
import { UpdateCategoryDto } from '@/categories/dtos/update-category.dto'
import { CreateCategoryDto } from '@/categories/dtos/create-category.dto'

@Injectable()
export class CategoriesRepository {
  constructor(@InjectModel('Category') private categoryModel: Model<ICategory>) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<ICategory> {
    const category = new this.categoryModel(createCategoryDto)
    return await category.save()
  }

  async listCategories(): Promise<Array<ICategory>> {
    return await this.categoryModel.find()
  }

  async listById(_id: string): Promise<ICategory> {
    return await this.categoryModel.findById(_id)
  }

  async update(_id: string, updateCategoryDto: UpdateCategoryDto): Promise<ICategory> {
    return await this.categoryModel.findOneAndUpdate({ _id }, { $set: updateCategoryDto })
  }
}
