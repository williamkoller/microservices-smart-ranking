import { Module } from '@nestjs/common'
import { ClientProxyModule } from '@/shared/modules/client-proxy.module'
import { CategoriesController } from '@/categories/controllers/categories.controller'

@Module({
  imports: [ClientProxyModule],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
