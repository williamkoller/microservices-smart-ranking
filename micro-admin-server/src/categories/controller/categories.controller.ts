import { Controller, Logger } from '@nestjs/common'
import { EventPattern, Payload } from '@nestjs/microservices'
import { CreateCategoryDTO } from '../dtos/create-category.dto'
import { CategoriesService } from '../services/categories.service'
import { Category } from '../types/category.type'

@Controller()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  private readonly logger = new Logger(CategoriesController.name)

  @EventPattern('create-category')
  async createCategory(@Payload() data: CreateCategoryDTO): Promise<Category> {
    this.logger.log(`category: ${JSON.stringify(data)}`)

    return await this.categoriesService.createCategory(data)
  }
}
