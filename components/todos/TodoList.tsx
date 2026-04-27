"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { TodoDTO } from "@/server/dtos/TodoDTOs/todo.dto";
import { TodoItem } from "./TodoItem";
import { EmptyState } from "@/components/ui/EmptyState";

type TodoListProps = {
  todos: TodoDTO[];
  deletingId: string | null;
  togglingId: string | null;
  onToggle: (id: string, completed: boolean) => void;
  onEdit: (todo: TodoDTO) => void;
  onDelete: (id: string) => void;
  onAddFirst: () => void;
  activeFilter: "all" | "pending" | "completed";
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.055 },
  },
};

export function TodoList({
  todos,
  deletingId,
  togglingId,
  onToggle,
  onEdit,
  onDelete,
  onAddFirst,
  activeFilter,
}: TodoListProps) {
  if (todos.length === 0) {
    const emptyMessages = {
      all: { title: "No tasks yet", description: "Add your first task and start getting things done." },
      pending: { title: "No pending tasks", description: "Everything's done — great work!" },
      completed: { title: "No completed tasks yet", description: "Complete a task and it'll show up here." },
    };

    const { title, description } = emptyMessages[activeFilter];

    return (
      <EmptyState
        title={title}
        description={description}
        action={
          activeFilter === "all" ? (
            <button
              onClick={onAddFirst}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add your first task
            </button>
          ) : undefined
        }
      />
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-2 p-4"
    >
      <AnimatePresence initial={false} mode="popLayout">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
            isDeleting={deletingId === todo.id}
            isToggling={togglingId === todo.id}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}