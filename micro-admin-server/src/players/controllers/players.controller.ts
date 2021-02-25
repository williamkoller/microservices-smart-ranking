import { Controller, Logger } from '@nestjs/common'
import { Ctx, MessagePattern, EventPattern, Payload, RmqContext } from '@nestjs/microservices'
import { PlayersService } from '@/players/services/players.service'
import { UpdatePlayerDto } from '../dtos/update-player.dto'
import { CreatePlayerDto } from '../dtos/create-player.dto'

const ackErrors: string[] = ['E11000']

@Controller()
export class PlayersController {
  private readonly logger = new Logger(PlayersController.name)

  constructor(private readonly playersService: PlayersService) {}

  @EventPattern('create-player')
  async create(@Payload() createPlayerDto: CreatePlayerDto, @Ctx() ctx: RmqContext) {
    const channel = ctx.getChannelRef()
    const originalMessage = ctx.getMessage()

    try {
      this.logger.log(`iPlayer: ${JSON.stringify(createPlayerDto)}`)
      await this.playersService.create(createPlayerDto)
      await channel.ack(originalMessage)
    } catch (e) {
      this.logger.log(`Error: ${JSON.stringify(e.message)}`)
      const filterAckError = ackErrors.filter((ackError) => e.message.includes(ackError))

      if (filterAckError.length > 0) {
        await channel.ack(originalMessage)
      }
    }
  }

  @MessagePattern('find-players')
  async listPlayers(@Payload() id: string, @Ctx() ctx: RmqContext) {
    const channel = ctx.getChannelRef()
    const originalMessage = ctx.getMessage()
    try {
      if (id) {
        return await this.playersService.findById(id)
      }
      return await this.playersService.listPlayers()
    } finally {
      await channel.ack(originalMessage)
    }
  }

  @EventPattern('update-player')
  async update(@Payload() updatePlayerDto: UpdatePlayerDto, @Ctx() ctx: RmqContext) {
    const channel = ctx.getChannelRef()
    const originalMessage = ctx.getMessage()
    try {
      this.logger.log(`updatePlayerDto: ${JSON.stringify(updatePlayerDto)}`)

      const { id, category, imgUrl } = updatePlayerDto

      await this.playersService.update(id, {
        ...(category ? { category } : {}),
        ...(imgUrl ? { imgUrl } : {}),
      })
      await channel.ack(originalMessage)
    } catch (e) {
      this.logger.log(`Error: ${JSON.stringify(e.message)}`)
      const filterAckError = ackErrors.filter((ackError) => e.message.includes(ackError))

      if (filterAckError.length > 0) {
        await channel.ack(originalMessage)
      }
    }
  }

  @EventPattern('delete-player')
  async delete(@Payload() id: string, @Ctx() ctx: RmqContext) {
    const channel = ctx.getChannelRef()
    const originalMessage = ctx.getMessage()
    try {
      await this.playersService.delete(id)
      await channel.ack(originalMessage)
    } catch (e) {
      this.logger.log(`Error: ${JSON.stringify(e.message)}`)
      const filterAckError = ackErrors.filter((ackError) => e.message.includes(ackError))

      if (filterAckError.length > 0) {
        await channel.ack(originalMessage)
      }
    }
  }
}
