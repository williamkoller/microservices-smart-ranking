import { Module } from '@nestjs/common'
import { PlayersModule } from '@/players/players.module'
import { CategoriesController } from '@/categories/controllers/categories.controller'
import { CategoriesRepository } from '@/categories/repositories/categories.repository'
import { CategoriesService } from '@/categories/services/categories.service'
import { MongooseModule } from '@nestjs/mongoose'
import { CategorySchema } from '@/categories/schemas/category.schema'

@Module({
  imports: [
    PlayersModule,
    MongooseModule.forFeature([
      {
        name: 'Category',
        schema: CategorySchema,
      },
    ]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepository],
  exports: [CategoriesService, CategoriesRepository],
})
export class CategoriesModule {}
