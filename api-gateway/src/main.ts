import { NestFactory } from '@nestjs/core'
import { AppModule } from '@/modules/app/app.module'
import { HttpExceptionFilter } from '@/modules/common/filters/http-exception.filter'
import { LoggingInterceptor } from '@/modules/common/interceptors/logging.interceptor'
import { TimeoutInterceptor } from '@/modules/common/interceptors/timeout.interceptor'
import { Logger } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'

const logger = new Logger('Main')

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.setGlobalPrefix('api/v1')
  app.useGlobalInterceptors(new LoggingInterceptor(), new TimeoutInterceptor())
  app.useGlobalFilters(new HttpExceptionFilter())

  await app.listen(process.env.PORT, () => logger.log('API Gateway'))
}
bootstrap()
