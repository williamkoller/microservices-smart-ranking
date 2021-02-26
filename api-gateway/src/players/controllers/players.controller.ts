import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Observable } from 'rxjs'
import { timeout } from 'rxjs/operators'
import { ClientProxyProvider } from '@/shared/providers/client-proxy.provider'
import { CreatePlayerDto, UpdatePlayerDto } from '@/players/dtos'
import { AwsS3Service } from '@/aws/s3/aws-s3.service'
import { ClientProxy } from '@nestjs/microservices'

@Controller('players')
export class PlayersController {
  constructor(private readonly clientProxyProvider: ClientProxyProvider, private readonly awsS3Service: AwsS3Service) {}

  @Get()
  async listPlayers(): Promise<Observable<any>> {
    return await this.clientProxyProvider
      .requestAdminServerInstance()
      .send('find-players', '')
      .pipe(timeout(12000))
      .toPromise()
  }

  @Get('id')
  async findById(@Param('id') id: string): Promise<Observable<ClientProxy>> {
    return await this.clientProxyProvider.requestAdminServerInstance().send('find-players', id).toPromise()
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createPlayerDto: CreatePlayerDto): Promise<Observable<ClientProxy>> {
    return await this.clientProxyProvider
      .requestAdminServerInstance()
      .emit('create-player', createPlayerDto)
      .toPromise()
  }

  @Put(':_id')
  @UsePipes(ValidationPipe)
  async update(@Param('_id') _id: string, @Body() updatePlayerDto: UpdatePlayerDto): Promise<Observable<ClientProxy>> {
    return await this.clientProxyProvider
      .requestAdminServerInstance()
      .emit('update-player', { id: _id, ...updatePlayerDto })
      .toPromise()
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Observable<ClientProxy>> {
    return await this.clientProxyProvider.requestAdminServerInstance().emit('delete-player', id).toPromise()
  }

  @Post('/:_id/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: any, @Param('_id') _id: string): Promise<Observable<ClientProxy>> {
    const player = await this.clientProxyProvider.requestAdminServerInstance().send('find-players', _id).toPromise()
    if (!player) {
      throw new NotFoundException(`Player not found.`)
    }

    const imgUrl = await this.awsS3Service.uploadFile(file, _id)

    const updatePlayerDto: UpdatePlayerDto = {}
    updatePlayerDto.imgUrl = imgUrl.url

    await this.clientProxyProvider
      .requestAdminServerInstance()
      .emit('update-player', { id: _id, player: updatePlayerDto })
      .toPromise()

    return await this.clientProxyProvider.requestAdminServerInstance().send('find-players', _id).toPromise()
  }
}
