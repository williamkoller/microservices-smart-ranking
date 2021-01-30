import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const TypeORMConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: process.env.MONGO_URI_PROD,
  synchronize: true,
  entities: [],
  useUnifiedTopology: true,
}
