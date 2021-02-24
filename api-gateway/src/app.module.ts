import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CategoriesModule } from '@/categories/categories.module'
import { PlayersModule } from '@/players/players.module'
import { AwsModule } from '@/aws/aws.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CategoriesModule,
    PlayersModule,
    AwsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
