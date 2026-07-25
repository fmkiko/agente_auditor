import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config/config.module';
import { BoardsModule } from './boards/boards.module';
import { ColumnsModule } from './columns/columns.module';
import { CardsModule } from './cards/cards.module';

@Module({
  imports: [
    ConfigModule,
    BoardsModule,
    ColumnsModule,
    CardsModule,
  ],
})
export class AppModule {}
