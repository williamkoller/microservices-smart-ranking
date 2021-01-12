import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { CreatePlayerDto } from '../dtos/create-player.dto'
import { PlayerDto } from '../dtos/player.dto'
import { UpdatePlayerDto } from '../dtos/update-player.dto'
import { Player, PlayerDocument } from '../models/player.schema'

@Injectable()
export class PlayersRepository {
  constructor(@InjectModel(Player.name) private playerModel: Model<PlayerDocument>) {}

  async findAll(): Promise<PlayerDto[]> {
    return this.playerModel.find()
  }

  async findById(id: string): Promise<Player> {
    return this.playerModel.findById(id)
  }

  async findByEmail(email: string): Promise<Player | null> {
    return this.playerModel.findOne({ email })
  }

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const player = new this.playerModel(createPlayerDto)

    player.category = Types.ObjectId(createPlayerDto.category)

    await player.save()

    return player
  }

  async update(id: string, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    return this.playerModel.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          ...updatePlayerDto,
          category: Types.ObjectId(updatePlayerDto.category),
        },
      },
    )
  }

  async delete(id: string): Promise<any> {
    return this.playerModel.deleteOne({
      _id: id,
    })
  }
}
