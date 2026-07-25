export interface Card {
  id: string;
  title: string;
  description?: string;
  position: number;
  columnId: string;
}

export interface Column {
  id: string;
  title: string;
  position: number;
  boardId: string;
  cards?: Card[];
}

export interface Board {
  id: string;
  title: string;
  columns: Column[];
}
