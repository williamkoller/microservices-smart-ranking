import { Module } from '@nestjs/common'
import { ClientProxyModule } from 'src/shared/modules/client-proxy.module'
import { PlayersController } from './controller/players.controller'

@Module({
  imports: [ClientProxyModule],
  controllers: [PlayersController],
})
export class PlayersModule {}
