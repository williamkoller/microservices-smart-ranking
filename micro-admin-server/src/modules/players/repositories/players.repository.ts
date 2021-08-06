import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Player } from '@/modules/players/interfaces/player.interface'
import { MessageReturn } from '@/modules/players/types/message-return.type'

@Injectable()
export class PlayersRepository {
  constructor(@InjectModel('Player') private playerModel: Model<Player>) {}

  async create(player: Player): Promise<Player> {
    const createdPlayer = new this.playerModel(player)
    return await createdPlayer.save()
  }

  async listAll(): Promise<Player[]> {
    return await this.playerModel.find({}, { __v: false }).populate('category', { __v: false })
  }

  async findById(id: string): Promise<Player> {
    return await this.playerModel.findById(id)
  }

  async findByEmail(email: string): Promise<Player | null> {
    return await this.playerModel.findOne({ email })
  }

  async update(_id: string, player: Player): Promise<Player> {
    return await this.playerModel.findOneAndUpdate({ _id }, { $set: player })
  }

  async delete(_id: string): Promise<MessageReturn> {
    await this.playerModel.deleteOne({
      _id,
    })
    return {
      message: 'Player deleted with successfully.',
    }
  }
}
