import { TypeOrmModule } from '@nestjs/typeorm'
import { ConnectionOptions } from 'node:tls'
import { ConfigModule } from '../config/config.module'
import { ConfigService } from '../config/config.service'
import { Configuration } from '../config/config.keys'

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
      return {
        ssl: false,
        type: 'postgres',
        port: 5444,
        database: 'bookstore',
        host: config.get(Configuration.HOST),
        username: config.get(Configuration.USERNAME),
        password: config.get(Configuration.PASSWORD),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations{.ts,.js}'],
      } as ConnectionOptions
    },
  }),
]
