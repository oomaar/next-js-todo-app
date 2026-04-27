import { TodoDTO } from "./todo.dto";

export type TodosResponseDTO = {
  todos: TodoDTO[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};