import { Module } from '@nestjs/common'
import { PlayersModule } from '@/modules/players/players.module'
import { CategoriesController } from '@/modules/categories/controllers/categories.controller'
import { CategoriesRepository } from '@/modules/categories/repositories/categories.repository'
import { CategoriesService } from '@/modules/categories/services/categories.service'
import { MongooseModule } from '@nestjs/mongoose'
import { CategorySchema } from '@/modules/categories/schemas/category.schema'

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
