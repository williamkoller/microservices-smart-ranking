import { Body, Controller, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common'
import { Observable } from 'rxjs'
import { ClientProxyProvider } from '@/modules/shared/providers/client-proxy.provider'
import { CreateCategoryDto, UpdateCategoryDto } from '@/modules/categories/dtos'
import { ClientProxy } from '@nestjs/microservices'

@Controller('categories')
export class CategoriesController {
  constructor(private readonly clientProxyProvider: ClientProxyProvider) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Observable<ClientProxy>> {
    return await this.clientProxyProvider
      .requestAdminServerInstance()
      .emit('create-category', createCategoryDto)
      .toPromise()
  }
  @Get()
  async searchAllCategories(@Query('id') id: string): Promise<Observable<ClientProxy>> {
    return await this.clientProxyProvider
      .requestAdminServerInstance()
      .send('find-categories', id ? id : '')
      .toPromise()
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async updateCategory(
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Param() _id: string,
  ): Promise<Observable<ClientProxy>> {
    return await this.clientProxyProvider
      .requestAdminServerInstance()
      .emit('update-category', { id: _id, ...updateCategoryDto })
      .toPromise()
  }
}
