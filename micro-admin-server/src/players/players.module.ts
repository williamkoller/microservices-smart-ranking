import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PlayersService } from '@/players/services/players.service'
import { PlayersController } from '@/players/controllers/players.controller'
import { Player, PlayerSchema } from '@/players/models/player.schema'
import { PlayersRepository } from '@/players/repositories/players.repository'

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
