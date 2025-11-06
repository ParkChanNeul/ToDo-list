
export interface Todo {
  id: string;
  title: string;
  checked: boolean;
  createdAt: Date;
}

export enum View {
  InProgress = 'in-progress',
  Completed = 'completed',
}
