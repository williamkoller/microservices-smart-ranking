import { Body, Controller, Logger, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { ClientProxyProvider } from 'src/shared/providers/client-proxy.provider'
import { CreateCategoryDto } from '../dtos/create-category.dto'

@Controller('api/v1')
export class CategoriesController {
  private readonly logger = new Logger(CategoriesController.name)

  constructor(private readonly clientProxyProvider: ClientProxyProvider) {}

  @Post('categories')
  @UsePipes(ValidationPipe)
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    this.clientProxyProvider.getAdminServerInstance().emit('create-category', createCategoryDto)
  }
}
