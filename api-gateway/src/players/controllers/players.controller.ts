import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { timeout } from 'rxjs/operators'
import { ClientProxyProvider } from 'src/shared/providers/client-proxy.provider'
import { CreatePlayerDto } from '../dtos/create-player.dto'
import { UpdatePlayerDto } from '../dtos/update-player.dto'

@Controller('api/v1/players')
export class PlayersController {
  private readonly logger = new Logger(PlayersController.name)
  constructor(private readonly clientProxyProvider: ClientProxyProvider) {}

  @Get()
  async findAllPlayers(): Promise<Observable<any>> {
    return await this.clientProxyProvider
      .requestAdminServerInstance()
      .send('find-players', '')
      .pipe(timeout(5000))
      .toPromise()
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Observable<any>> {
    return await this.clientProxyProvider.requestAdminServerInstance().send('find-players', id).toPromise()
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createPlayerDto: CreatePlayerDto): Promise<Observable<any>> {
    return await this.clientProxyProvider
      .requestAdminServerInstance()
      .emit('create-player', createPlayerDto)
      .toPromise()
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto): Promise<Observable<any>> {
    const category = await this.clientProxyProvider
      .requestAdminServerInstance()
      .send('find-categories', updatePlayerDto.category)
      .toPromise()

    if (!category) {
      throw new BadRequestException('Category not found')
    }

    return await this.clientProxyProvider
      .requestAdminServerInstance()
      .emit('update-player', { id, ...updatePlayerDto })
      .toPromise()
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Observable<any>> {
    return await this.clientProxyProvider.requestAdminServerInstance().emit('delete-player', id).toPromise()
  }
}
