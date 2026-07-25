import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, transferArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { BoardsService } from '../boards.service';
import { Board, Card, Column } from '../models';
import { ColumnComponent } from '../column/column.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, DragDropModule, ColumnComponent],
  template: `
    <header>
      <h1>Trello Simple</h1>
      <div class="new-board">
        <input #btitle placeholder="Nombre del tablero" (keyup.enter)="createBoard(btitle)" />
        <button (click)="createBoard(btitle)">Crear tablero</button>
      </div>
    </header>

    <div class="boards" *ngIf="boards.length">
      <button
        *ngFor="let b of boards"
        class="board-tab"
        [class.active]="b.id === selectedId"
        (click)="select(b.id)"
      >
        {{ b.title }}
      </button>
    </div>

    <div class="board" *ngIf="board">
      <app-column
        *ngFor="let col of board.columns"
        [column]="col"
        [connectedTo]="columnIds"
        (dropCard)="onDrop($event)"
        (addCard)="onAddCard($event)"
        (removeCard)="onRemoveCard($event)"
        (removeColumn)="onRemoveColumn($event)"
      ></app-column>

      <div class="add-column">
        <input #ctitle placeholder="Nombre de columna" (keyup.enter)="createColumn(ctitle)" />
        <button (click)="createColumn(ctitle)">+ Columna</button>
      </div>
    </div>
  `,
  styles: [
    `
      header {
        padding: 12px 16px;
        background: rgba(0, 0, 0, 0.2);
        color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      header h1 { margin: 0; font-size: 20px; }
      .new-board { display: flex; gap: 6px; }
      .boards { display: flex; gap: 8px; padding: 12px 16px; background: rgba(0, 0, 0, 0.1); }
      .board-tab { background: #fff; color: #172b4d; }
      .board-tab.active { background: #fff; font-weight: bold; box-shadow: 0 0 0 2px #fff; }
      .board {
        display: flex;
        gap: 12px;
        padding: 16px;
        align-items: flex-start;
        overflow-x: auto;
      }
      .add-column { width: 272px; }
      .add-column input { margin-bottom: 6px; }
    `,
  ],
})
export class BoardComponent implements OnInit {
  boards: Board[] = [];
  board: Board | null = null;
  selectedId: string | null = null;

  constructor(private service: BoardsService) {}

  ngOnInit() {
    this.service.listBoards().subscribe({
      next: (b) => {
        this.boards = b;
        if (b.length) this.select(b[0].id);
      },
      error: () => {},
    });
  }

  get columnIds(): string[] {
    return this.board?.columns?.map((c) => c.id) ?? [];
  }

  select(id: string) {
    this.selectedId = id;
    localStorage.setItem('last-selected-board', id);
    document.title = `Board ${id}`;
    this.service.getBoard(id).subscribe((b) => {
      b.columns = (b.columns ?? []).sort((a, c) => a.position - c.position);
      b.columns.forEach((col) =>
        col.cards?.sort((a, c) => a.position - c.position),
      );
      b.columns = (b.columns ?? []).sort((a, c) => a.position - c.position);
      b.columns.forEach((col) =>
        col.cards?.sort((a, c) => a.position - c.position),
      );
      this.board = { ...b, columns: b.columns ?? [] };
    });
  }

  createBoard(input: HTMLInputElement) {
    const title = input.value.trim();
    if (!title) return;
    this.service.createBoard(title).subscribe((b) => {
      input.value = '';
      this.boards = [...this.boards, b];
      this.select(b.id);
    });
  }

  createColumn(input: HTMLInputElement) {
    if (!this.selectedId) return;
    const title = input.value.trim();
    if (!title) return;
    this.service.createColumn(this.selectedId, title).subscribe((col) => {
      input.value = '';
      this.board!.columns = [...(this.board!.columns ?? []), { ...col, cards: [] }];
    });
  }

  onDrop(event: CdkDragDrop<Card[]>) {
    if (!this.board) return;
    const prevCol = this.board.columns.find((c) => c.id === event.previousContainer.id);
    const newCol = this.board.columns.find((c) => c.id === event.container.id);
    if (!prevCol || !newCol) return;

    const card = prevCol.cards![event.previousIndex];

    if (event.previousContainer === event.container) {
      moveItemInArray(newCol.cards!, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        prevCol.cards!,
        newCol.cards!,
        event.previousIndex,
        event.currentIndex,
      );
    }

    this.service
      .moveCard(card.id, newCol.id, event.currentIndex)
      .subscribe({
        error: () => {},
      });
  }

  onAddCard(data: { columnId: string; title: string }) {
    this.service.createCard(data.columnId, data.title).subscribe((card) => {
      const col = this.board!.columns.find((c) => c.id === data.columnId);
      col!.cards = [...(col!.cards ?? []), card];
    });
  }

  onRemoveCard(cardId: string) {
    this.service.deleteCard(cardId).subscribe(() => {
      this.board!.columns.forEach((c) => {
        c.cards = c.cards?.filter((x) => x.id !== cardId);
      });
    });
  }

  onRemoveColumn(columnId: string) {
    this.service.deleteColumn(columnId).subscribe(() => {
      this.board!.columns = this.board!.columns.filter((c) => c.id !== columnId);
    });
  }
}
