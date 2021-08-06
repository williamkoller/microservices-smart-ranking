import { ClientProxyProvider } from '@/modules/shared/providers/client-proxy.provider'
import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { Observable } from 'rxjs'
import { CreateChallengeDto } from '@/modules/challenges/dtos/create-challenge.dto'

@Controller('challenges')
export class ChallengesController {
  constructor(private readonly clientProxyProvider: ClientProxyProvider) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createChallengeDto: CreateChallengeDto): Promise<Observable<ClientProxy>> {
    return await this.clientProxyProvider
      .requestChallengeInstance()
      .emit('create-challenge', createChallengeDto)
      .toPromise()
  }
}
