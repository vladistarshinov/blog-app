import { ConfigService } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const getPgConfig = async (
  config: ConfigService,
): Promise<PostgresConnectionOptions> => ({
  type: 'postgres',
  host: config.get<string>('TYPEORM_HOST'),
  username: config.get<string>('TYPEORM_USERNAME'),
  password: config.get<string>('TYPEORM_PASSWORD'),
  database: config.get<string>('TYPEORM_DATABASE'),
  port: +config.get<number>('TYPEORM_PORT'),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../**/*.migration{.ts,.js}'],
  synchronize: true,
  logging: true,
});
