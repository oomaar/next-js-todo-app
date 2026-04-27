import mongoose, { Document, Schema, Types } from "mongoose";

export type TodoDocument = Document & {
  title: string;
  description?: string;
  completed: boolean;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

const TodoSchema = new Schema<TodoDocument>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    completed: { type: Boolean, default: false },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

TodoSchema.index({ userId: 1, createdAt: -1 });

const Todo = mongoose.models.Todo ?? mongoose.model<TodoDocument>("Todo", TodoSchema);

export default Todo;