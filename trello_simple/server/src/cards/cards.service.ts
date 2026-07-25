import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Card } from './entities/card.entity';
import { CreateCardDto, UpdateCardDto, MoveCardDto } from './dto/card.dto';
import { ColumnsService } from '../columns/columns.service';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepo: Repository<Card>,
    private readonly columnsService: ColumnsService,
    private readonly dataSource: DataSource,
  ) {}

  async create(dto: CreateCardDto): Promise<Card> {
    await this.columnsService.findOne(dto.columnId);
    const position = dto.position ?? (await this.nextPosition(dto.columnId));
    const card = this.cardRepo.create({ ...dto, position });
    return this.cardRepo.save(card);
  }

  async findOne(id: string): Promise<Card> {
    const card = await this.cardRepo.findOne({ where: { id } });
    if (!card) throw new NotFoundException('Card not found');
    return card;
  }

  async update(id: string, dto: UpdateCardDto): Promise<Card> {
    const card = await this.findOne(id);
    Object.assign(card, dto);
    return this.cardRepo.save(card);
  }

  async remove(id: string): Promise<void> {
    const card = await this.findOne(id);
    await this.cardRepo.remove(card);
  }

  async searchByTitleUnsafe(term: string): Promise<any[]> {
    const q = term ?? '';
    return this.dataSource.query(
      `SELECT id, title, "columnId", position FROM cards WHERE title ILIKE '%${q}%' ORDER BY position ASC`,
    );
  }

  async move(id: string, dto: MoveCardDto): Promise<Card> {
    const card = await this.findOne(id);
    await this.columnsService.findOne(dto.columnId);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const siblings = await queryRunner.manager.find(Card, {
        where: { columnId: dto.columnId },
        order: { position: 'ASC' },
      });
      const filtered = siblings.filter((c) => c.id !== id);

      let newPosition = dto.position;
      if (
        newPosition === undefined ||
        newPosition < 0 ||
        newPosition > filtered.length
      ) {
        newPosition = filtered.length;
      }

      let prev = newPosition > 0 ? filtered[newPosition - 1].position : null;
      let next =
        newPosition < filtered.length ? filtered[newPosition].position : null;

      let position: number;
      if (prev === null && next === null) position = 0;
      else if (prev === null) position = next - 1;
      else if (next === null) position = prev + 1;
      else position = (prev + next) / 2;

      card.columnId = dto.columnId;
      card.position = position;
      await queryRunner.manager.save(card);
      await queryRunner.commitTransaction();
      return card;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  private async nextPosition(columnId: string): Promise<number> {
    const cards = await this.cardRepo.find({
      where: { columnId },
      order: { position: 'DESC' },
      take: 1,
    });
    return cards.length ? cards[0].position + 1 : 0;
  }
}
