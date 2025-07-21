export enum TodoStatus {
  BACKLOG = "backlog",
  IN_PROGRESS = "in progress",
  CANCEL = "cancel",
  COMPLETED = "completed",
}

export type TTodo = {
    id: number
    name: string
    location: string
    description: string
    status: TodoStatus
    date: string
}
