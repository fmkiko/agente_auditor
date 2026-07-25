import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { ColumnsModule } from '../columns/columns.module';

@Module({
  imports: [TypeOrmModule.forFeature([Card]), ColumnsModule],
  controllers: [CardsController],
  providers: [CardsService],
  exports: [CardsService],
})
export class CardsModule {}
