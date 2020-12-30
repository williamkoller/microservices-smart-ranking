import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CategoriesModule } from './categories/categories.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
