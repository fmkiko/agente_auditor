import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Index,
} from 'typeorm';
import { Board } from '../../boards/entities/board.entity';
import { Card } from '../../cards/entities/card.entity';

@Entity('columns')
export class BoardColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'float', default: 0 })
  position: number;

  @ManyToOne(() => Board, (board) => board.columns, { onDelete: 'CASCADE' })
  board: Board;

  @Column()
  @Index()
  boardId: string;

  @OneToMany(() => Card, (card) => card.column, {
    cascade: true,
    eager: true,
  })
  cards: Card[];
}
