import { Injectable, Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { CategoriesRepository } from '@/categories/repositories/categories.repository'
import { CreateCategoryDto } from '@/categories/dtos/create-category.dto'
import { UpdateCategoryDto } from '@/categories/dtos/update-category.dto'
import { Category } from '../interfaces/category.interface'

@Injectable()
export class CategoriesService {
  private logger = new Logger(CategoriesService.name)
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      return await this.categoriesRepository.create(createCategoryDto)
    } catch (e) {
      this.logger.log(`Error: ${JSON.stringify(e)}`)
      throw new RpcException(e.message)
    }
  }
  async listCategories(): Promise<Category[]> {
    const categories = await this.categoriesRepository.listCategories()
    if (categories?.length === 0) {
      throw new RpcException('No record found.')
    }
    return categories
  }

  async listById(_id: string): Promise<Category> {
    try {
      return await this.categoriesRepository.listById(_id)
    } catch (e) {
      this.logger.log(`Error: ${JSON.stringify(e)}`)
      throw new RpcException(e.message)
    }
  }

  async update(_id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    try {
      return await this.categoriesRepository.update(_id, updateCategoryDto)
    } catch (e) {
      this.logger.log(`Error: ${JSON.stringify(e)}`)
      throw new RpcException(e.message)
    }
  }
}
