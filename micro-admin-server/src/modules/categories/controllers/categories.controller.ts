import { Controller, Logger } from '@nestjs/common'
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices'
import { CategoriesService } from '@/modules/categories/services/categories.service'
import { CreateCategoryDto } from '@/modules/categories/dtos/create-category.dto'
import { UpdateCategoryDto } from '@/modules/categories/dtos/update-category.dto'

const ackErrors: string[] = ['E11000']

@Controller()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  logger = new Logger(CategoriesController.name)

  @EventPattern('create-category')
  async create(@Payload() createCategoryDto: CreateCategoryDto, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef()
    const originalMessage = context.getMessage()

    this.logger.log(`createCategoryDto: ${JSON.stringify(createCategoryDto)}`)

    try {
      await this.categoriesService.create(createCategoryDto)
      await channel.ack(originalMessage)
    } catch (e) {
      this.logger.error(`Error: ${JSON.stringify(e.message)}`)
      const filterAckError = ackErrors.filter((ackError) => e.message.includes(ackError))

      if (filterAckError.length > 0) {
        await channel.ack(originalMessage)
      }
    }
  }

  @MessagePattern('find-categories')
  async findAllCategories(@Payload() id: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef()
    const originalMessage = context.getMessage()

    try {
      if (id) {
        return this.categoriesService.findById(id)
      }
      return this.categoriesService.listCategories()
    } finally {
      await channel.ack(originalMessage)
    }
  }

  @EventPattern('update-category')
  async update(@Payload() updateCategoryDto: UpdateCategoryDto, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef()
    const originalMessage = context.getMessage()

    this.logger.log(`updateCategoryDto: ${JSON.stringify(updateCategoryDto)}`)
    try {
      const { id, description, events } = updateCategoryDto
      await this.categoriesService.update(id, { description, events })
      await channel.ack(originalMessage)
    } catch (e) {
      this.logger.error(`Error: ${JSON.stringify(e.message)}`)
      const filterAckError = ackErrors.filter((ackError) => e.message.includes(ackError))

      if (filterAckError.length > 0) {
        await channel.ack(originalMessage)
      }
    }
  }
}
