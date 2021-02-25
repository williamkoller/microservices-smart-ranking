import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UpdatePlayerDto } from '@/players/dtos/update-player.dto'
import { CreatePlayerDto } from '@/players/dtos/create-player.dto'
import { Player } from '../interfaces/player.interface'
import { MessageReturn } from '../types/message-return.type'

@Injectable()
export class PlayersRepository {
  constructor(@InjectModel('Player') private playerModel: Model<Player>) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const player = new this.playerModel(createPlayerDto)
    return await player.save()
  }

  async listAll(): Promise<Player[]> {
    return await this.playerModel.find()
  }

  async findById(id: string): Promise<Player> {
    return await this.playerModel.findById(id)
  }

  async findByEmail(email: string): Promise<Player | null> {
    return await this.playerModel.findOne({ email })
  }

  async update(_id: string, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    return await this.playerModel.findByIdAndUpdate({ _id }, { $set: updatePlayerDto })
  }

  async delete(id: string): Promise<MessageReturn> {
    await this.playerModel.deleteOne({
      _id: id,
    })
    return {
      message: 'Player deleted with successfully.',
    }
  }
}
