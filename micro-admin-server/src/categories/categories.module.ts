import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PlayersModule } from '@/players/players.module'
import { CategoriesController } from '@/categories/controllers/categories.controller'
import { Category, CategorySchema } from '@/categories/models/category.schema'
import { CategoriesRepository } from '@/categories/repositories/categories.repository'
import { CategoriesService } from '@/categories/services/categories.service'

@Module({
  imports: [
    PlayersModule,
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema,
      },
    ]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepository],
  exports: [CategoriesService, CategoriesRepository],
})
export class CategoriesModule {}
