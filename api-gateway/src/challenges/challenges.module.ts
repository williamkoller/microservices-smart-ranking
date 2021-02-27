import { ClientProxyModule } from '@/shared/modules/client-proxy.module'
import { Module } from '@nestjs/common'
import { ChallengesController } from '@/challenges/controllers/challenges.controller'

@Module({
  providers: [ClientProxyModule],
  controllers: [ChallengesController],
})
export class ChallengesModule {}
