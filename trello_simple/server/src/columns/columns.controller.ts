import { Controller, Get, Post, Param, Body, Patch, Delete, Query } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnDto, UpdateColumnDto } from './dto/column.dto';

@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Post()
  create(@Body() dto: CreateColumnDto) {
    return this.columnsService.create(dto);
  }

  @Get()
  findByBoard(@Query('boardId') boardId: string) {
    return this.columnsService.findAllByBoard(boardId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.columnsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateColumnDto) {
    return this.columnsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.columnsService.remove(id);
  }
}
