import { Controller, Get, Post, Param, Body, Patch, Delete } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto, UpdateBoardDto } from './dto/board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  create(@Body() dto: CreateBoardDto) {
    return this.boardsService.create(dto);
  }

  @Get()
  findAll() {
    return this.boardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBoardDto) {
    return this.boardsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardsService.remove(id);
  }
}
