import { Controller, Logger } from '@nestjs/common'
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices'
import { CreateCategoryDto } from '../dtos/create-category.dto'
import { UpdateCategoryDto } from '../dtos/update-category.dto'
import { CategoriesService } from '../services/categories.service'

@Controller()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  logger = new Logger(CategoriesController.name)

  @EventPattern('create-category')
  async create(@Payload() createCategoryDto: CreateCategoryDto, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef()
    const originalMessage = context.getMessage()

    this.logger.log(createCategoryDto)

    await this.categoriesService.create(createCategoryDto)
    await channel.ack(originalMessage)
  }

  @MessagePattern('find-categories')
  async findAllCategories(@Payload() id: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef()
    const originalMessage = context.getMessage()

    try {
      if (id) {
        return this.categoriesService.findById(id)
      }

      return this.categoriesService.findAll()
    } finally {
      await channel.ack(originalMessage)
    }
  }

  @EventPattern('update-category')
  async update(@Payload() updateCategoryDto: UpdateCategoryDto, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef()
    const originalMessage = context.getMessage()

    this.logger.log(updateCategoryDto)

    const { id, description, events } = updateCategoryDto

    await this.categoriesService.update(id, { description, events })
    await channel.ack(originalMessage)
  }
}
