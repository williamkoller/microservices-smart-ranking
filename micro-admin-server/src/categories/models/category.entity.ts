import { Player } from '@/players/models/player.entity'
import { Column, ObjectIdColumn, OneToMany, PrimaryColumn } from 'typeorm'
import { EventType } from '../types/event.type'

export class Category {
  @ObjectIdColumn()
  _id: string

  @PrimaryColumn()
  name: string

  @Column()
  description: string

  @Column({ type: 'array' })
  events: Array<EventType>

  @Column()
  @OneToMany(() => Player, (player) => player.category)
  player: Player
}
