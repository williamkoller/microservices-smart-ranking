import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { ResponseDeletePlayer } from '@/players/types/response-delete-player.type'
import { UpdatePlayerDto } from '@/players/dtos/update-player.dto'
import { CreatePlayerDto } from '@/players/dtos/create-player.dto'
import { Player, PlayerDocument } from '@/players/schemas/player.schema'

@Injectable()
export class PlayersRepository {
  constructor(@InjectModel('Player') private playerModel: Model<PlayerDocument>) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const playerCreated = new this.playerModel(createPlayerDto)
    return playerCreated.save()
  }

  async listPlayers(): Promise<Array<Player>> {
    return await this.playerModel.find().populate('categories').exec()
  }

  async findById(id: string): Promise<Player> {
    return await this.playerModel.findById(id)
  }

  async update(_id: string, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    return await this.playerModel.findByIdAndUpdate(_id, {
      $set: { ...updatePlayerDto, category: Types.ObjectId(updatePlayerDto.category) },
    })
  }

  async delete(_id: string): Promise<ResponseDeletePlayer> {
    const iPlayer = await this.playerModel.deleteOne({ _id })
    return {
      iPlayer,
      message: 'Player deleted with successfully.',
    }
  }

  async findByEmail(email: string): Promise<Player> {
    return await this.playerModel.findOne({ email })
  }
}
