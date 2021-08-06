import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { UpdateCategoryDto } from '@/modules/categories/dtos/update-category.dto'
import { CreateCategoryDto } from '@/modules/categories/dtos/create-category.dto'
import { Category } from '../interfaces/category.interface'

@Injectable()
export class CategoriesRepository {
  constructor(@InjectModel('Category') private categoryModel: Model<Category>) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = new this.categoryModel(createCategoryDto)
    return await category.save()
  }

  async findAll(): Promise<Array<Category>> {
    return await this.categoryModel.find({}, { __v: false })
  }

  async findCategoryById(_id: string): Promise<Category> {
    return await this.categoryModel.findById(_id)
  }

  async update(_id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    return await this.categoryModel.findOneAndUpdate({ _id }, { ...updateCategoryDto })
  }
}
