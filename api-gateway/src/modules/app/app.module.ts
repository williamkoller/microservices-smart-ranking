import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CategoriesModule } from '@/modules/categories/categories.module'
import { PlayersModule } from '@/modules/players/players.module'
import { AwsModule } from '@/modules/aws/aws.module'
import { ChallengesModule } from '@/modules/challenges/challenges.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CategoriesModule,
    PlayersModule,
    AwsModule,
    ChallengesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
