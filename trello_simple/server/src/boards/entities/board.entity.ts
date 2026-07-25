import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { BoardColumn } from '../../columns/entities/column.entity';

@Entity('boards')
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => BoardColumn, (column) => column.board, {
    cascade: true,
    eager: true,
  })
  columns: BoardColumn[];
}
