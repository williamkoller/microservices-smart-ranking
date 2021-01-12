import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PlayersService } from './services/players.service'
import { PlayersController } from './controllers/players.controller'
import { Player, PlayerSchema } from './models/player.schema'
import { PlayersRepository } from './repositories/players.repository'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Player.name,
        schema: PlayerSchema,
      },
    ]),
  ],
  controllers: [PlayersController],
  providers: [PlayersService, PlayersRepository],
  exports: [PlayersService, PlayersRepository],
})
export class PlayersModule {}
