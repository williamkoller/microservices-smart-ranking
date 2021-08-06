import { Controller, Logger } from '@nestjs/common'
import { Ctx, MessagePattern, EventPattern, Payload, RmqContext } from '@nestjs/microservices'
import { PlayersService } from '@/modules/players/services/players.service'
import { Player } from '@/modules/players/interfaces/player.interface'

const ackErrors: string[] = ['E11000']

@Controller()
export class PlayersController {
  private readonly logger = new Logger(PlayersController.name)

  constructor(private readonly playersService: PlayersService) {}

  @EventPattern('create-player')
  async create(@Payload() player: Player, @Ctx() ctx: RmqContext) {
    const channel = ctx.getChannelRef()
    const originalMessage = ctx.getMessage()

    try {
      this.logger.log(`player: ${JSON.stringify(player)}`)
      await this.playersService.create(player)
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
  async update(@Payload() data: any, @Ctx() ctx: RmqContext) {
    const channel = ctx.getChannelRef()
    const originalMessage = ctx.getMessage()
    try {
      this.logger.log(`data: ${JSON.stringify(data)}`)
      const _id: string = data.id
      const player: Player = data.player
      await this.playersService.update(_id, player)
      await channel.ack(originalMessage)
    } catch (e) {
      this.logger.log(`Error: ${JSON.stringify(e)}`)
      const filterAckError = ackErrors.filter((ackError) => e.message.includes(ackError))

      if (filterAckError.length > 0) {
        await channel.ack(originalMessage)
      }
    }
  }

  @EventPattern('delete-player')
  async delete(@Payload() _id: string, @Ctx() ctx: RmqContext) {
    const channel = ctx.getChannelRef()
    const originalMessage = ctx.getMessage()
    try {
      await this.playersService.delete(_id)
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
