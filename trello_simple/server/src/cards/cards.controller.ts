import { Controller, Post, Param, Body, Patch, Delete, Get, Query } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto, UpdateCardDto, MoveCardDto } from './dto/card.dto';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  create(@Body() dto: CreateCardDto) {
    return this.cardsService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardsService.findOne(id);
  }

  @Get('search/raw')
  searchRaw(@Query('q') q: string) {
    return this.cardsService.searchByTitleUnsafe(q);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCardDto) {
    return this.cardsService.update(id, dto);
  }

  @Post(':id/move')
  move(@Param('id') id: string, @Body() dto: MoveCardDto) {
    return this.cardsService.move(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardsService.remove(id);
  }
}
