export interface Task {
  id?: number;
  title: string;
  description: string;
  completed: boolean;
}
export interface TaskWithId extends Task {
  id: number
}
