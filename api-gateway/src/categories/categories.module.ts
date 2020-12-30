import { Module } from '@nestjs/common'
import { ClientProxyModule } from 'src/shared/modules/client-proxy.module'
import { CategoriesController } from './controller/categories.controller'

@Module({
  imports: [ClientProxyModule],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
