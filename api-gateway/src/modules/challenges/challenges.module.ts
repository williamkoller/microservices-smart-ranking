import { ClientProxyModule } from '@/modules/shared/modules/client-proxy.module'
import { Module } from '@nestjs/common'
import { ChallengesController } from '@/modules/challenges/controllers/challenges.controller'

@Module({
  imports: [ClientProxyModule],
  controllers: [ChallengesController],
})
export class ChallengesModule {}
