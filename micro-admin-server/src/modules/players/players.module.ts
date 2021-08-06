import { Module } from '@nestjs/common'
import { PlayersService } from '@/modules/players/services/players.service'
import { PlayersController } from '@/modules/players/controllers/players.controller'
import { PlayersRepository } from '@/modules/players/repositories/players.repository'
import { MongooseModule } from '@nestjs/mongoose'
import { PlayerSchema } from '@/modules/players/schemas/player.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Player',
        schema: PlayerSchema,
      },
    ]),
  ],
  controllers: [PlayersController],
  providers: [PlayersService, PlayersRepository],
  exports: [PlayersService, PlayersRepository],
})
export class PlayersModule {}
