import { Module } from '@nestjs/common'
import { PlayersModule } from '@/players/players.module'
import { CategoriesController } from '@/categories/controllers/categories.controller'
import { CategoriesRepository } from '@/categories/repositories/categories.repository'
import { CategoriesService } from '@/categories/services/categories.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Category } from '@/categories/models/category.entity'

@Module({
  imports: [PlayersModule, TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepository],
  exports: [CategoriesService, CategoriesRepository],
})
export class CategoriesModule {}
