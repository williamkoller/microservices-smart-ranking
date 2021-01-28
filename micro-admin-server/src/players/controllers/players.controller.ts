import { Controller, Logger } from '@nestjs/common'
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices'
import { CreatePlayerDto, UpdatePlayerDto } from '@/players/dtos'
import { PlayersService } from '@/players/services/players.service'

@Controller()
export class PlayersController {
  private readonly logger = new Logger(PlayersController.name)

  constructor(private readonly playersService: PlayersService) {}

  @MessagePattern('find-players')
  async findAllCategories(@Payload() id: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef()
    const originalMessage = context.getMessage()

    try {
      if (id) {
        return this.playersService.findById(id)
      }

      return this.playersService.findAll()
    } finally {
      await channel.ack(originalMessage)
    }
  }

  @MessagePattern('create-player')
  async create(@Payload() createPlayerDto: CreatePlayerDto, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef()
    const originalMessage = context.getMessage()

    this.logger.log(JSON.stringify(createPlayerDto))

    await this.playersService.create(createPlayerDto)

    await channel.ack(originalMessage)
  }

  @MessagePattern('update-player')
  async update(@Payload() updatePlayerDto: UpdatePlayerDto, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef()
    const originalMessage = context.getMessage()

    this.logger.log(JSON.stringify(updatePlayerDto))

    const { id, category, imgUrl } = updatePlayerDto

    await this.playersService.update(id, {
      ...(category ? { category } : {}),
      ...(imgUrl ? { imgUrl } : {}),
    })

    await channel.ack(originalMessage)
  }

  @MessagePattern('delete-player')
  async delete(@Payload() id: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef()
    const originalMessage = context.getMessage()

    await this.playersService.deleteById(id)

    await channel.ack(originalMessage)
  }
}
