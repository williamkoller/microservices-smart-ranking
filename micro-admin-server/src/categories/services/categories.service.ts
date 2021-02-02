import { Injectable, Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { CategoriesRepository } from '@/categories/repositories/categories.repository'
import { ICategory } from '@/categories/interfaces/category.interface'
import { CreateCategoryDto } from '@/categories/dtos/create-category.dto'
import { UpdateCategoryDto } from '@/categories/dtos/update-category.dto'

@Injectable()
export class CategoriesService {
  private logger = new Logger(CategoriesService.name)
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<ICategory> {
    try {
      return await this.categoriesRepository.create(createCategoryDto)
    } catch (e) {
      this.logger.log(`Error: ${JSON.stringify(e)}`)
      throw new RpcException(e.message)
    }
  }
  async listCategories(): Promise<ICategory[]> {
    return this.categoriesRepository.listCategories()
  }

  async listById(_id: string): Promise<ICategory> {
    try {
      return await this.categoriesRepository.listById(_id)
    } catch (e) {
      this.logger.log(`Error: ${JSON.stringify(e)}`)
      throw new RpcException(e.message)
    }
  }

  async update(_id: string, updateCategoryDto: UpdateCategoryDto): Promise<ICategory> {
    try {
      return await this.categoriesRepository.update(_id, updateCategoryDto)
    } catch (e) {
      this.logger.log(`Error: ${JSON.stringify(e)}`)
      throw new RpcException(e.message)
    }
  }
}
