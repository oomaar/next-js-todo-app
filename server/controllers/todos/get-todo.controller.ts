import { NextRequest, NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";
import { connectDB } from "@/server/db/mongoose";
import Todo from "@/server/models/Todo";
import type { TodoDTO } from "@/server/dtos/TodoDTOs/todo.dto";

export async function getTodoController(req: NextRequest, id: string): Promise<NextResponse> {
  try {
    if (!isValidObjectId(id)) {
      return NextResponse.json({ message: "Invalid todo ID" }, { status: 400 });
    }

    const userId = req.headers.get("x-user-id")!;

    await connectDB();

    const todo = await Todo.findOne({ _id: id, userId });
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
    console.error("[get-todo]", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}