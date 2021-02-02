import { Module } from '@nestjs/common'
import { PlayersService } from '@/players/services/players.service'
import { PlayersController } from '@/players/controllers/players.controller'
import { PlayersRepository } from '@/players/repositories/players.repository'
import { MongooseModule } from '@nestjs/mongoose'
import { PlayerModel } from '@/players/models/player.model'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Player',
        schema: PlayerModel,
      },
    ]),
  ],
  controllers: [PlayersController],
  providers: [PlayersService, PlayersRepository],
  exports: [PlayersService, PlayersRepository],
})
export class PlayersModule {}
