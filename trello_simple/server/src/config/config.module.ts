import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';

dotenv.config();

@Module({
  imports: [
    NestConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME || 'trello',
      password: process.env.DB_PASSWORD || 'trello',
      database: process.env.DB_DATABASE || 'trello',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class ConfigModule {}
