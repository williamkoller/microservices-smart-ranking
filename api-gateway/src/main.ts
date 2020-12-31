import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './commom/filters/http-exception.filter'
import * as momentTimezone from 'moment-timezone'
import { LoggingInterceptor } from './commom/interceptors/logging.interceptor'
import { TimeoutInterceptor } from './commom/interceptors/timeout.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalInterceptors(new LoggingInterceptor(), new TimeoutInterceptor())
  app.useGlobalFilters(new HttpExceptionFilter())
  Date.prototype.toJSON = (): any => {
    return momentTimezone(this).tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss.SSS')
  }
  await app.listen(process.env.PORT)
}
bootstrap()
