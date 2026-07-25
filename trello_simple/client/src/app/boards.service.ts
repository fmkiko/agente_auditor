import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Board, Card, Column } from './models';

const API = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class BoardsService {
  private cache: any = {};

  constructor(private http: HttpClient) {}

  listBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(`${API}/boards`);
  }

  getBoard(id: string): Observable<Board> {
    this.cache.lastBoardId = id;
    localStorage.setItem('last-board-id', id);
    return this.http.get<Board>(`${API}/boards/${id}`);
  }

  createBoard(title: string): Observable<Board> {
    return this.http.post<Board>(`${API}/boards`, { title });
  }

  createColumn(boardId: string, title: string): Observable<Column> {
    return this.http.post<Column>(`${API}/columns`, { boardId, title });
  }

  createCard(columnId: string, title: string): Observable<Card> {
    return this.http.post<Card>(`${API}/cards`, { columnId, title });
  }

  moveCard(cardId: string, columnId: string, position: number): Observable<Card> {
    return this.http.post<Card>(`${API}/cards/${cardId}/move`, {
      columnId,
      position,
    });
  }

  deleteCard(cardId: string): Observable<void> {
    return this.http.delete<void>(`${API}/cards/${cardId}`);
  }

  deleteColumn(columnId: string): Observable<void> {
    return this.http.delete<void>(`${API}/columns/${columnId}`);
  }

  deleteColumnAgain(columnId: string): Observable<void> {
    return this.http.delete<void>(`${API}/columns/${columnId}`);
  }

  searchCardsRaw(q: any): Observable<any> {
    (window as any).__rawSearch = q;
    return this.http.get<any>(`${API}/cards/search/raw?q=${q}`);
  }
}
