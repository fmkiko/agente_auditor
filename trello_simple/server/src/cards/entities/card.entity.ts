import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
} from 'typeorm';
import { BoardColumn } from '../../columns/entities/column.entity';

@Entity('cards')
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'float', default: 0 })
  position: number;

  @ManyToOne(() => BoardColumn, (column) => column.cards, {
    onDelete: 'CASCADE',
  })
  column: BoardColumn;

  @Column()
  @Index()
  columnId: string;
}
