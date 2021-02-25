import { Injectable, Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { PlayersRepository } from '@/players/repositories/players.repository'
import { UpdatePlayerDto } from '../dtos/update-player.dto'
import { CreatePlayerDto } from '../dtos/create-player.dto'
import { Player } from '../interfaces/player.interface'
import { MessageReturn } from '../types/message-return.type'

@Injectable()
export class PlayersService {
  private logger = new Logger(PlayersService.name)
  constructor(private readonly playersRepository: PlayersRepository) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    try {
      const playerExists = await this.playersRepository.findByEmail(createPlayerDto.email)
      if (playerExists) {
        throw new RpcException('E-mail already in use')
      }
      return await this.playersRepository.create(createPlayerDto)
    } catch (e) {
      this.logger.log(`Error: ${JSON.stringify(e.message)}`)
      throw new RpcException(e.message)
    }
  }

  async listPlayers(): Promise<Array<Player>> {
    const players = await this.playersRepository.listAll()
    if (!players) {
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

  async update(id: string, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    return await this.playersRepository.update(id, updatePlayerDto)
  }

  async delete(id: string): Promise<MessageReturn> {
    await this.findById(id)
    return await this.playersRepository.delete(id)
  }
}
