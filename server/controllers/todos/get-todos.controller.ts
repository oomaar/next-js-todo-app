import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/server/db/mongoose";
import Todo from "@/server/models/Todo";
import type { TodosResponseDTO } from "@/server/dtos/TodoDTOs/todos-response.dto";

export async function getTodosController(req: NextRequest): Promise<NextResponse> {
  try {
    const userId = req.headers.get("x-user-id")!;
    const { searchParams } = new URL(req.url);

    const page = Math.max(1, Number(searchParams.get("page") ?? 1));
    const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit") ?? 10)));
    const skip = (page - 1) * limit;

    await connectDB();

    const [todos, total] = await Promise.all([
      Todo.find({ userId }).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Todo.countDocuments({ userId }),
    ]);

    const response: TodosResponseDTO = {
      todos: todos.map((t) => ({
        id: t._id.toString(),
        title: t.title,
        description: t.description,
        completed: t.completed,
        createdAt: t.createdAt.toISOString(),
        updatedAt: t.updatedAt.toISOString(),
      })),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("[get-todos]", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}