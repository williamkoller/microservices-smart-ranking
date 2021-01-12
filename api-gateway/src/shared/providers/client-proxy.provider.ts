import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices'

@Injectable()
export class ClientProxyProvider {
  constructor(private readonly configService: ConfigService) {}

  requestAdminServerInstance(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get<string>('RMQ_URL')],
        queue: 'admin-server',
      },
    })
  }

  requestChallengeInstance(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get<string>('RMQ_URL')],
        queue: 'challenges',
      },
    })
  }

  requestRankingInstance(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get<string>('RMQ_URL')],
        queue: 'rankings',
      },
    })
  }
}
