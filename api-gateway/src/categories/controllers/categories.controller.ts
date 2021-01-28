import { Body, Controller, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common'
import { Observable } from 'rxjs'
import { ClientProxyProvider } from '@/shared/providers/client-proxy.provider'
import { CreateCategoryDto } from '../dtos/create-category.dto'
import { UpdateCategoryDto } from '../dtos/update-category.dto'

@Controller('api/v1/categories')
export class CategoriesController {
  constructor(private readonly clientProxyProvider: ClientProxyProvider) {}

  @Post()
  @UsePipes(ValidationPipe)
  createCategory(@Body() createCategoryDto: CreateCategoryDto): Observable<any> {
    return this.clientProxyProvider.requestAdminServerInstance().emit('create-category', createCategoryDto)
  }
  @Get()
  searchAllCategories(@Query('id') id: string): Observable<any> {
    return this.clientProxyProvider.requestAdminServerInstance().send('find-categories', id ? id : '')
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  updateCategory(@Body() updateCategoryDto: UpdateCategoryDto, @Param() _id: string): Observable<any> {
    return this.clientProxyProvider
      .requestAdminServerInstance()
      .emit('update-category', { id: _id, ...updateCategoryDto })
  }
}
