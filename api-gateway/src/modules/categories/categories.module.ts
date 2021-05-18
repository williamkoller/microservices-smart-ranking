import { Module } from '@nestjs/common'
import { ClientProxyModule } from '@/modules/shared/modules/client-proxy.module'
import { CategoriesController } from '@/modules/categories/controllers/categories.controller'

@Module({
  imports: [ClientProxyModule],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
