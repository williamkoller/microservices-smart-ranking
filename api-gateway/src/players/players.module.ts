import { Module } from '@nestjs/common'
import { ClientProxyModule } from '@/shared/modules/client-proxy.module'
import { PlayersController } from './controllers/players.controller'

@Module({
  imports: [ClientProxyModule],
  controllers: [PlayersController],
})
export class PlayersModule {}
