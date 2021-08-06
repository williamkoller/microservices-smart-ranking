import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import { AppModule } from '@/modules/app/app.module'
import { ConfigService } from '@nestjs/config'

const logger = new Logger('Main')

async function bootstrap() {
  const configService = new ConfigService()
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [configService.get<string>('RMQ_URL')],
      noAck: false,
      queue: configService.get<string>('QUEUE_NAME'),
    },
  })

  app.listen(() => logger.log('Microservice is listening.'))
}
bootstrap()
