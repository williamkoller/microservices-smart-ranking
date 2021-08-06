import { Module } from '@nestjs/common'
import { ClientProxyModule } from '@/modules/shared/modules/client-proxy.module'
import { PlayersController } from '@/modules/players/controllers/players.controller'
import { AwsModule } from '@/modules/aws/aws.module'

@Module({
  imports: [ClientProxyModule, AwsModule],
  controllers: [PlayersController],
})
export class PlayersModule {}
