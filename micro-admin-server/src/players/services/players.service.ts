import { Injectable, Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { PlayersRepository } from '@/players/repositories/players.repository'
import { IPlayer } from '@/players/interfaces/player.interface'
import { ResponseDeletePlayer } from '@/players/types/response-delete-player.type'
import { UpdatePlayerDto } from '../dtos/update-player.dto'
import { CreatePlayerDto } from '../dtos/create-player.dto'

@Injectable()
export class PlayersService {
  private logger = new Logger(PlayersService.name)
  constructor(private readonly playersRepository: PlayersRepository) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<IPlayer> {
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

  async listPlayers(): Promise<Array<IPlayer>> {
    return this.playersRepository.listPlayers()
  }

  async findById(id: string): Promise<IPlayer> {
    const player = await this.playersRepository.findById(id)

    if (!player) {
      throw new RpcException('Player not found')
    }
    return player
  }

  async update(id: string, updatePlayerDto: UpdatePlayerDto): Promise<IPlayer> {
    return await this.playersRepository.update(id, updatePlayerDto)
  }

  async delete(id: string): Promise<ResponseDeletePlayer> {
    const { _id } = await this.findById(id)
    return await this.playersRepository.delete(_id)
  }
}
