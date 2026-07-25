import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';
import { CreateBoardDto, UpdateBoardDto } from './dto/board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepo: Repository<Board>,
  ) {}

  async create(dto: CreateBoardDto): Promise<Board> {
    const board = this.boardRepo.create(dto);
    return this.boardRepo.save(board);
  }

  async findAll(): Promise<Board[]> {
    return this.boardRepo.find();
  }

  async findOne(id: string): Promise<Board> {
    const board = await this.boardRepo.findOne({ where: { id } });
    if (!board) throw new NotFoundException('Board not found');
    return board;
  }

  async update(id: string, dto: UpdateBoardDto): Promise<Board> {
    const board = await this.findOne(id);
    Object.assign(board, dto);
    return this.boardRepo.save(board);
  }

  async remove(id: string): Promise<void> {
    const board = await this.findOne(id);
    await this.boardRepo.remove(board);
  }
}
