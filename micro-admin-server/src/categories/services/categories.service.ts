import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateCategoryDTO } from '../dtos/create-category.dto'
import { Category } from '../types/category.type'

@Injectable()
export class CategoriesService {
  private readonly logger = new Logger(CategoriesService.name)

  constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>) {}

  async createCategory(data: CreateCategoryDTO): Promise<Category> {
    try {
      const categoryCreated = new this.categoryModel(data)
      return await categoryCreated.save()
    } catch (error) {
      this.logger.error(`Error createCategory: ${JSON.stringify(error.message)}`)
      throw new RpcException(error.message)
    }
  }

  async searchAllCategories(): Promise<Array<Category>> {
    try {
      return await this.categoryModel.find({}, { __v: false }).exec()
    } catch (error) {
      this.logger.error(`Error on searchAllCategories: ${JSON.stringify(error.message)}`)
      throw new RpcException(error.message)
    }
  }

  async searchCategoryById(category: string): Promise<Category> {
    const categoryFound = await this.categoryModel.findOne({ category }).exec()
    if (!categoryFound) {
      throw new NotFoundException('Category not found.')
    }
    return categoryFound
  }
}
