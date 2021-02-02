import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { IPlayer } from '@/players/interfaces/player.interface'
import { ResponseDeletePlayer } from '@/players/types/response-delete-player.type'
import { UpdatePlayerDto } from '@/players/dtos/update-player.dto'
import { CreatePlayerDto } from '../dtos/create-player.dto'

@Injectable()
export class PlayersRepository {
  constructor(@InjectModel('Player') private playerModel: Model<IPlayer>) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<IPlayer> {
    const playerCreated = new this.playerModel(createPlayerDto)
    return playerCreated.save()
  }

  async listPlayers(): Promise<Array<IPlayer>> {
    return await this.playerModel.find().populate('categories')
  }

  async findById(id: string): Promise<IPlayer> {
    return await this.playerModel.findById(id)
  }

  async update(_id: string, updatePlayerDto: UpdatePlayerDto): Promise<IPlayer> {
    return await this.playerModel.findOneAndUpdate({ _id }, { $set: updatePlayerDto })
  }

  async delete(_id: string): Promise<ResponseDeletePlayer> {
    const iPlayer = await this.playerModel.deleteOne({ _id })
    return {
      iPlayer,
      message: 'Player deleted with successfully.',
    }
  }

  async findByEmail(email: string): Promise<IPlayer> {
    return await this.playerModel.findOne({ email })
  }
}
