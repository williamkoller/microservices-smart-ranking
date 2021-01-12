import { Body, Controller, Get, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common'
import { Observable } from 'rxjs'
import { ClientProxyProvider } from 'src/shared/providers/client-proxy.provider'
import { CreatePlayerDto } from '../dtos/create-player.dto'
import { UpdatePlayerDto } from '../dtos/update-player.dto'

@Controller('players')
export class PlayersController {
  constructor(private readonly clientProxyProvider: ClientProxyProvider) {}

  @Post()
  @UsePipes(ValidationPipe)
  createPlayer(@Body() createPlayerDto: CreatePlayerDto): Observable<any> {
    return this.clientProxyProvider.requestAdminServerInstance().emit('create-player', createPlayerDto)
  }

  @Get()
  searchAllPlayers(@Query('playerId') _id: string): Observable<any> {
    return this.clientProxyProvider.requestAdminServerInstance().send('search-all-players', _id ? _id : '')
  }

  @Put('/_id')
  @UsePipes(ValidationPipe)
  updatePlayer(@Body() updatePlayerDto: UpdatePlayerDto): Observable<any> {
    return this.clientProxyProvider.requestAdminServerInstance().emit('update-player', updatePlayerDto)
  }
}
