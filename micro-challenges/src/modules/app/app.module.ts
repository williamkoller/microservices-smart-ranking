import { forwardRef, Module } from '@nestjs/common'
import { ChallengeModule } from '../challenges/challenge.module'

@Module({
  imports: [forwardRef(() => ChallengeModule)],
  controllers: [],
  providers: [],
})
export class AppModule {}
