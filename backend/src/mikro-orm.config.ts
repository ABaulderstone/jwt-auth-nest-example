import { MikroOrmModuleOptions as Options } from '@mikro-orm/nestjs';

import { LoadStrategy } from '@mikro-orm/core';

const config: Options = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number.parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER,
  password: '',
  dbName: process.env.DB_NAME,
  entities: ['dist/**/*.entity.js'],
  // entitiesTs: ['src/**/*.entity.ts'],
  debug: true,
  loadStrategy: LoadStrategy.JOINED,
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
  },
};

export default config;
