import { Injectable } from '@nestjs/common'
import { Player } from '../models/player.schema'

@Injectable()
export class PlayerDto extends Player {
  _id?: string
}
