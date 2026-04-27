import { NextRequest, NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";
import { connectDB } from "@/server/db/mongoose";
import Todo from "@/server/models/Todo";

export async function deleteTodoController(req: NextRequest, id: string): Promise<NextResponse> {
  try {
    if (!isValidObjectId(id)) {
      return NextResponse.json({ message: "Invalid todo ID" }, { status: 400 });
    }

    const userId = req.headers.get("x-user-id")!;

    await connectDB();

    const todo = await Todo.findOneAndDelete({ _id: id, userId });
    if (!todo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Todo deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("[delete-todo]", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
