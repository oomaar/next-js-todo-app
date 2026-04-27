import { NextRequest } from "next/server";
import { getTodoController } from "@/server/controllers/todos/get-todo.controller";
import { updateTodoController } from "@/server/controllers/todos/update-todo.controller";
import { deleteTodoController } from "@/server/controllers/todos/delete-todo.controller";

export async function GET(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  return getTodoController(req, id);
}

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  return updateTodoController(req, id);
}

export async function DELETE(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  return deleteTodoController(req, id);
}