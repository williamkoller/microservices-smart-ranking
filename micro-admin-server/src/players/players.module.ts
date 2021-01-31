import { Module } from '@nestjs/common'
import { PlayersService } from '@/players/services/players.service'
import { PlayersController } from '@/players/controllers/players.controller'
import { PlayersRepository } from '@/players/repositories/players.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Player } from '@/players/models/player.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Player])],
  controllers: [PlayersController],
  providers: [PlayersService, PlayersRepository],
  exports: [PlayersService, PlayersRepository],
})
export class PlayersModule {}
