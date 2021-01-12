import { Module } from '@nestjs/common'
import { PlayersController } from './controller/players.controller'

@Module({
  controllers: [PlayersController],
})
export class PlayersModule {}
