import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Card } from '../models';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  template: `
    <div class="card" cdkDrag [cdkDragData]="card">
      <span>{{ card.title }}</span>
      <button class="del" (click)="remove.emit(card.id)">×</button>
    </div>
  `,
  styles: [
    `
      .card {
        background: #fff;
        border-radius: 6px;
        padding: 8px 10px;
        margin-bottom: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
        cursor: grab;
      }
      .del {
        background: transparent;
        color: #888;
        font-size: 16px;
        padding: 0 4px;
      }
    `,
  ],
})
export class CardComponent {
  @Input() card!: Card;
  @Output() remove = new EventEmitter<string>();
}
