import { Injectable } from '@nestjs/common'
import { Player } from '@/players/models/player.schema'

@Injectable()
export class PlayerDto extends Player {
  _id?: string
}
