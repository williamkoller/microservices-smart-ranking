import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PlayersModule } from 'src/players/players.module'
import { CategoriesController } from './controllers/categories.controller'
import { Category, CategorySchema } from './models/category.schema'
import { CategoriesRepository } from './repositories/categories.repository'
import { CategoriesService } from './services/categories.service'

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
