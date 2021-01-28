import { Injectable } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { CreatePlayerDto, UpdatePlayerDto } from '@/players/dtos'
import { Player } from '@/players/models/player.schema'
import { PlayersRepository } from '@/players/repositories/players.repository'

@Injectable()
export class PlayersService {
  constructor(private readonly playersRepository: PlayersRepository) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const findByEmail = await this.playersRepository.findByEmail(createPlayerDto.email)

    if (findByEmail) {
      throw new RpcException('e-mail already in use')
    }

    return this.playersRepository.create(createPlayerDto)
  }

  async findAll(): Promise<Player[]> {
    return this.playersRepository.findAll()
  }

  async findById(id: string): Promise<Player> {
    const player = await this.playersRepository.findById(id)

    if (!player) {
      throw new RpcException('Player not found')
    }

    return player
  }

  async deleteById(id: string) {
    const player = this.playersRepository.findById(id)

    if (!player) {
      throw new RpcException('Player not found')
    }

    return this.playersRepository.delete(id)
  }

  async update(id: string, updatePlayerDto: UpdatePlayerDto) {
    return this.playersRepository.update(id, updatePlayerDto)
  }
}
