import { NestFactory } from '@nestjs/core'
import { AppModule } from '@/modules/app/app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { Logger } from '@nestjs/common'

const logger = new Logger('Main')

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  await app.listen(process.env.PORT, () => logger.log('Challenges'))
}
bootstrap()
