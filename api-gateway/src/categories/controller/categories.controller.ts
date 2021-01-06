import { Body, Controller, Get, Logger, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common'
import { Observable } from 'rxjs'
import { ClientProxyProvider } from 'src/shared/providers/client-proxy.provider'
import { CreateCategoryDto } from '../dtos/create-category.dto'
import { UpdateCategoryDto } from '../dtos/update-category.dto'

@Controller('api/v1/categories')
export class CategoriesController {
  private readonly logger = new Logger(CategoriesController.name)

  constructor(private readonly clientProxyProvider: ClientProxyProvider) {}

  @Post()
  @UsePipes(ValidationPipe)
  createCategory(@Body() createCategoryDto: CreateCategoryDto): Observable<any> {
    return this.clientProxyProvider.getAdminServerInstance().emit('create-category', createCategoryDto)
  }
  @Get()
  searchAllCategories(@Query('categoryId') _id: string): Observable<any> {
    return this.clientProxyProvider.getAdminServerInstance().send('search-all-categories', _id ? _id : '')
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  updateCategory(@Body() updateCategoryDto: UpdateCategoryDto, @Param() _id: string): Observable<any> {
    return this.clientProxyProvider
      .getAdminServerInstance()
      .emit('update-category', { id: _id, category: updateCategoryDto })
  }
}
