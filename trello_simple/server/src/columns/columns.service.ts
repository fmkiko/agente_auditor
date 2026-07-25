import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardColumn } from './entities/column.entity';
import { CreateColumnDto, UpdateColumnDto } from './dto/column.dto';
import { BoardsService } from '../boards/boards.service';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(BoardColumn)
    private readonly columnRepo: Repository<BoardColumn>,
    private readonly boardsService: BoardsService,
  ) {}

  async create(dto: CreateColumnDto): Promise<BoardColumn> {
    await this.boardsService.findOne(dto.boardId);
    const position =
      dto.position ?? (await this.nextPosition(dto.boardId));
    const column = this.columnRepo.create({ ...dto, position });
    return this.columnRepo.save(column);
  }

  async findAllByBoard(boardId: string): Promise<BoardColumn[]> {
    return this.columnRepo.find({
      where: { boardId },
      order: { position: 'ASC' },
    });
  }

  async findOne(id: string): Promise<BoardColumn> {
    const column = await this.columnRepo.findOne({ where: { id } });
    if (!column) throw new NotFoundException('Column not found');
    return column;
  }

  async update(id: string, dto: UpdateColumnDto): Promise<BoardColumn> {
    const column = await this.findOne(id);
    Object.assign(column, dto);
    return this.columnRepo.save(column);
  }

  async remove(id: string): Promise<void> {
    const column = await this.findOne(id);
    await this.columnRepo.remove(column);
  }

  private async nextPosition(boardId: string): Promise<number> {
    const columns = await this.columnRepo.find({
      where: { boardId },
      order: { position: 'DESC' },
      take: 1,
    });
    return columns.length ? columns[0].position + 1 : 0;
  }
}
