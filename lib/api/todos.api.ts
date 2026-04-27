import type { TodoDTO } from "@/server/dtos/TodoDTOs/todo.dto";
import type { TodosResponseDTO } from "@/server/dtos/TodoDTOs/todos-response.dto";
import type { CreateTodoDTO } from "@/server/dtos/TodoDTOs/create-todo.dto";
import type { UpdateTodoDTO } from "@/server/dtos/TodoDTOs/update-todo.dto";

async function handleResponse<T>(res: Response): Promise<T> {
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data as T;
}

export async function getTodosAPI(page = 1, limit = 100): Promise<TodosResponseDTO> {
  const res = await fetch(`/api/todos?page=${page}&limit=${limit}`);
  return handleResponse<TodosResponseDTO>(res);
}

export async function getTodoAPI(id: string): Promise<TodoDTO> {
  const res = await fetch(`/api/todos/${id}`);
  return handleResponse<TodoDTO>(res);
}

export async function createTodoAPI(body: CreateTodoDTO): Promise<TodoDTO> {
  const res = await fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return handleResponse<TodoDTO>(res);
}

export async function updateTodoAPI(id: string, body: UpdateTodoDTO): Promise<TodoDTO> {
  const res = await fetch(`/api/todos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return handleResponse<TodoDTO>(res);
}

export async function deleteTodoAPI(id: string): Promise<void> {
  const res = await fetch(`/api/todos/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to delete todo");
  }
}