import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/server/db/mongoose";
import Todo from "@/server/models/Todo";
import type { CreateTodoDTO } from "@/server/dtos/TodoDTOs/create-todo.dto";
import type { TodoDTO } from "@/server/dtos/TodoDTOs/todo.dto";

export async function createTodoController(req: NextRequest): Promise<NextResponse> {
  try {
    const userId = req.headers.get("x-user-id")!;
    const body: CreateTodoDTO = await req.json();
    const { title, description } = body;

    if (!title?.trim()) {
      return NextResponse.json({ message: "title is required" }, { status: 400 });
    }

    await connectDB();

    const todo = await Todo.create({
      title: title.trim(),
      description: description?.trim(),
      userId,
    });

    const response: TodoDTO = {
      id: todo._id.toString(),
      title: todo.title,
      description: todo.description,
      completed: todo.completed,
      createdAt: todo.createdAt.toISOString(),
      updatedAt: todo.updatedAt.toISOString(),
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("[create-todo]", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}