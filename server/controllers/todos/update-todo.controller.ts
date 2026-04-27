import { NextRequest, NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";
import { connectDB } from "@/server/db/mongoose";
import Todo from "@/server/models/Todo";
import type { UpdateTodoDTO } from "@/server/dtos/TodoDTOs/update-todo.dto";
import type { TodoDTO } from "@/server/dtos/TodoDTOs/todo.dto";

export async function updateTodoController(req: NextRequest, id: string): Promise<NextResponse> {
  try {
    if (!isValidObjectId(id)) {
      return NextResponse.json({ message: "Invalid todo ID" }, { status: 400 });
    }

    const userId = req.headers.get("x-user-id")!;
    const body: UpdateTodoDTO = await req.json();
    const { title, description, completed } = body;

    if (title !== undefined && !title.trim()) {
      return NextResponse.json({ message: "title cannot be empty" }, { status: 400 });
    }

    const updates: Partial<{ title: string; description: string; completed: boolean }> = {};
    if (title !== undefined) updates.title = title.trim();
    if (description !== undefined) updates.description = description.trim();
    if (completed !== undefined) updates.completed = completed;

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ message: "No valid fields to update" }, { status: 400 });
    }

    await connectDB();

    const todo = await Todo.findOneAndUpdate({ _id: id, userId }, updates, { new: true });
    if (!todo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    const response: TodoDTO = {
      id: todo._id.toString(),
      title: todo.title,
      description: todo.description,
      completed: todo.completed,
      createdAt: todo.createdAt.toISOString(),
      updatedAt: todo.updatedAt.toISOString(),
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("[update-todo]", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}