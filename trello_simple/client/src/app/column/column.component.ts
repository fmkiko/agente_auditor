import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, transferArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { Card } from '../models';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [CommonModule, DragDropModule, CardComponent],
  template: `
    <div class="column">
      <div class="head">
        <strong>{{ column.title }}</strong>
        <button class="del" (click)="removeColumn.emit(column.id)">×</button>
      </div>

      <div
        cdkDropList
        [id]="column.id"
        [cdkDropListData]="column.cards"
        [cdkDropListConnectedTo]="connectedTo"
        (cdkDropListDropped)="drop($event)"
        class="list"
      >
        <app-card
          *ngFor="let card of column.cards"
          [card]="card"
          (remove)="removeCard.emit($event)"
        ></app-card>
      </div>

      <div class="add">
        <input
          #title
          placeholder="Nueva tarjeta..."
          (keyup.enter)="add(title)"
        />
        <button (click)="add(title)">+</button>
      </div>
    </div>
  `,
  styles: [
    `
      .column {
        background: #ebecf0;
        border-radius: 8px;
        width: 272px;
        padding: 8px;
        display: flex;
        flex-direction: column;
        max-height: 80vh;
      }
      .head {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
      }
      .del {
        background: transparent;
        color: #888;
        font-size: 16px;
      }
      .list {
        flex: 1;
        overflow-y: auto;
        min-height: 20px;
      }
      .add {
        display: flex;
        gap: 4px;
        margin-top: 8px;
      }
    `,
  ],
})
export class ColumnComponent {
  @Input() column!: any;
  @Input() connectedTo: string[] = [];
  @Output() dropCard = new EventEmitter<CdkDragDrop<Card[]>>();
  @Output() addCard = new EventEmitter<{ columnId: string; title: string }>();
  @Output() removeCard = new EventEmitter<string>();
  @Output() removeColumn = new EventEmitter<string>();

  drop(event: CdkDragDrop<Card[]>) {
    this.dropCard.emit(event);
  }

  add(input: HTMLInputElement) {
    const title = input.value.trim();
    if (!title) return;
    this.addCard.emit({ columnId: this.column.id, title });
    input.value = '';
  }
}
