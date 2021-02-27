import { Injectable, Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { PlayersRepository } from '@/players/repositories/players.repository'
import { Player } from '../interfaces/player.interface'
import { MessageReturn } from '../types/message-return.type'

@Injectable()
export class PlayersService {
  private logger = new Logger(PlayersService.name)
  constructor(private readonly playersRepository: PlayersRepository) {}

  async create(player: Player): Promise<Player> {
    try {
      const playerExists = await this.playersRepository.findByEmail(player.email)
      if (playerExists) {
        throw new RpcException('E-mail already in use')
      }
      return await this.playersRepository.create(player)
    } catch (e) {
      this.logger.log(`Error: ${JSON.stringify(e.message)}`)
      throw new RpcException(e.message)
    }
  }

  async listPlayers(): Promise<Array<Player>> {
    const players = await this.playersRepository.listAll()
    if (players?.length === 0) {
      throw new RpcException('No record found.')
    }
    return players
  }

  async findById(id: string): Promise<Player> {
    const player = await this.playersRepository.findById(id)

    if (!player) {
      throw new RpcException('Player not found')
    }
    return player
  }

  async update(_id: string, player: Player): Promise<Player> {
    return await this.playersRepository.update(_id, player)
  }

  async delete(id: string): Promise<MessageReturn> {
    await this.findById(id)
    return await this.playersRepository.delete(id)
  }
}
