import { NextRequest } from "next/server";
import { getTodosController } from "@/server/controllers/todos/get-todos.controller";
import { createTodoController } from "@/server/controllers/todos/create-todo.controller";

export async function GET(req: NextRequest) {
  return getTodosController(req);
}

export async function POST(req: NextRequest) {
  return createTodoController(req);
}