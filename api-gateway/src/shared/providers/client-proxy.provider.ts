import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientProxyFactory, Transport } from '@nestjs/microservices'

@Injectable()
export class ClientProxyProvider {
  constructor(private readonly configService: ConfigService) {}

  getAdminServerInstance() {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get<string>('RMQ_URL')],
        queue: 'admin-server',
      },
    })
  }

  getChallengeInstance() {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get<string>('RMQ_URL')],
        queue: 'challenges',
      },
    })
  }

  getRankingInstance() {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get<string>('RMQ_URL')],
        queue: 'rankings',
      },
    })
  }
}
