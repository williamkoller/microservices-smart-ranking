import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
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
import { ReturnFileS3Type } from '@/aws/types/return-file-s3.type'

@Controller('players')
export class PlayersController {
  private readonly logger = new Logger(PlayersController.name)
  constructor(private readonly clientProxyProvider: ClientProxyProvider, private readonly awsS3Service: AwsS3Service) {}

  @Get()
  async listPlayers(): Promise<Observable<any>> {
    return await this.clientProxyProvider
      .requestAdminServerInstance()
      .send('find-players', '')
      .pipe(timeout(5000))
      .toPromise()
  }

  @Get('id')
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

  @Put(':_id')
  @UsePipes(ValidationPipe)
  async update(@Param('_id') _id: string, @Body() updatePlayerDto: UpdatePlayerDto): Promise<Observable<any>> {
    return await this.clientProxyProvider
      .requestAdminServerInstance()
      .emit('update-player', { id: _id, ...updatePlayerDto })
      .toPromise()
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Observable<any>> {
    return await this.clientProxyProvider.requestAdminServerInstance().emit('delete-player', id).toPromise()
  }

  @Post('/:_id/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file, @Param('_id') _id: string): Promise<ReturnFileS3Type> {
    this.logger.log(file, _id)
    return this.awsS3Service.uploadFile(file, _id)
  }
}
