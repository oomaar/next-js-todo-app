"use client";

import { motion } from "framer-motion";
import type { TodoDTO } from "@/server/dtos/TodoDTOs/todo.dto";

type TodoItemProps = {
  todo: TodoDTO;
  onToggle: (id: string, completed: boolean) => void;
  onEdit: (todo: TodoDTO) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
  isToggling: boolean;
};

export function TodoItem({ todo, onToggle, onEdit, onDelete, isDeleting, isToggling }: TodoItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -24, transition: { duration: 0.2 } }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group flex items-start gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3.5 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700/60 dark:bg-slate-800 dark:hover:border-slate-600"
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id, !todo.completed)}
        disabled={isToggling}
        className="mt-0.5 shrink-0 focus:outline-none disabled:cursor-not-allowed"
        aria-label={todo.completed ? "Mark incomplete" : "Mark complete"}
      >
        <motion.div
          animate={todo.completed ? { scale: [1, 1.2, 1] } : { scale: 1 }}
          transition={{ duration: 0.2 }}
          className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
            todo.completed
              ? "border-emerald-500 bg-emerald-500"
              : "border-slate-300 bg-transparent hover:border-indigo-400 dark:border-slate-600 dark:hover:border-indigo-500"
          }`}
        >
          {todo.completed && (
            <motion.svg
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="h-3 w-3 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </motion.svg>
          )}
        </motion.div>
      </button>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p
          className={`text-sm font-medium leading-snug transition-colors ${
            todo.completed
              ? "text-slate-400 line-through dark:text-slate-500"
              : "text-slate-800 dark:text-slate-100"
          }`}
        >
          {todo.title}
        </p>
        {todo.description && (
          <p
            className={`mt-0.5 text-xs leading-relaxed transition-colors ${
              todo.completed
                ? "text-slate-300 line-through dark:text-slate-600"
                : "text-slate-500 dark:text-slate-400"
            }`}
          >
            {todo.description}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          onClick={() => onEdit(todo)}
          className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-indigo-600 dark:hover:bg-slate-700 dark:hover:text-indigo-400"
          aria-label="Edit task"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
          </svg>
        </button>

        <button
          onClick={() => onDelete(todo.id)}
          disabled={isDeleting}
          className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed dark:hover:bg-red-900/20 dark:hover:text-red-400"
          aria-label="Delete task"
        >
          {isDeleting ? (
            <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-300 border-t-red-500" />
          ) : (
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          )}
        </button>
      </div>
    </motion.div>
  );
}