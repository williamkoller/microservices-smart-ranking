import { Controller, Logger } from '@nestjs/common'
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices'
import { CreateCategoryDTO } from '../dtos/create-category.dto'
import { CategoriesService } from '../services/categories.service'
import { Category } from '../types/category.type'

const ackErrors: string[] = ['E11000']

@Controller()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  private readonly logger = new Logger(CategoriesController.name)

  @EventPattern('create-category')
  async createCategory(@Payload() data: CreateCategoryDTO, @Ctx() ctx: RmqContext) {
    const channel = ctx.getChannelRef()
    const originalMsg = ctx.getMessage()

    this.logger.log(`category: ${JSON.stringify(data)}`)

    try {
      await this.categoriesService.createCategory(data)
      await channel.ack(originalMsg)
    } catch (error) {
      this.logger.error(`Error: ${JSON.stringify(error.message)}`)

      const filterAckErrors = ackErrors.filter((ackError) => error.message.includes(ackError))

      if (filterAckErrors) {
        await channel.ack(originalMsg)
      }
    }
  }

  @MessagePattern('search-all-categories')
  async searchAllCategories(@Payload() _id: string): Promise<Array<Category> | Category> {
    if (_id) {
      return await this.categoriesService.searchCategoryById(_id)
    }
    return this.categoriesService.searchAllCategories()
  }
}
