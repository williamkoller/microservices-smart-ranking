import { Document } from 'mongoose'
import { Player } from '../../players/types/player.type'
import { EventType } from './event.type'

export type Category = CategoryDocument

export interface CategoryDocument extends Document {
  category: string
  description: string
  events: Array<EventType>
  players: Array<Player>
}
