"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { TodoDTO } from "@/server/dtos/TodoDTOs/todo.dto";

type TodoModalProps = {
  open: boolean;
  editTodo: TodoDTO | null;
  isPending: boolean;
  onClose: () => void;
  onSubmit: (title: string, description: string) => void;
};

type FormProps = {
  defaultTitle: string;
  defaultDescription: string;
  isEdit: boolean;
  isPending: boolean;
  onClose: () => void;
  onSubmit: (title: string, description: string) => void;
};

function TodoModalForm({ defaultTitle, defaultDescription, isEdit, isPending, onClose, onSubmit }: FormProps) {
  const [title, setTitle] = useState(defaultTitle);
  const [description, setDescription] = useState(defaultDescription);
  const [titleError, setTitleError] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setTitleError("Title is required");
      return;
    }
    onSubmit(title.trim(), description.trim());
  }

  return (
    <>
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          {isEdit ? "Edit task" : "New task"}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Title */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            ref={titleRef}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (titleError) setTitleError("");
            }}
            placeholder="What needs to be done?"
            className={`rounded-xl border px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:ring-2 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500 ${
              titleError
                ? "border-red-400 focus:border-red-400 focus:ring-red-200 dark:border-red-500 dark:focus:ring-red-900/40"
                : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-100 dark:border-slate-700 dark:focus:border-indigo-500 dark:focus:ring-indigo-900/40"
            }`}
          />
          {titleError && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-red-500"
            >
              {titleError}
            </motion.p>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Description <span className="font-normal text-slate-400">(optional)</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add more details…"
            rows={3}
            className="resize-none rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-indigo-500 dark:focus:ring-indigo-900/40"
          />
        </div>

        {/* Actions */}
        <div className="mt-1 flex justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:opacity-60"
          >
            {isPending && (
              <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            )}
            {isEdit ? "Save changes" : "Add task"}
          </button>
        </div>
      </form>
    </>
  );
}

export function TodoModal({ open, editTodo, isPending, onClose, onSubmit }: TodoModalProps) {
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97, transition: { duration: 0.15 } }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 top-1/2 z-50 mx-auto max-w-md -translate-y-1/2 rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900"
            onKeyDown={handleKeyDown}
          >
            <TodoModalForm
              key={editTodo?.id ?? "create"}
              defaultTitle={editTodo?.title ?? ""}
              defaultDescription={editTodo?.description ?? ""}
              isEdit={editTodo !== null}
              isPending={isPending}
              onClose={onClose}
              onSubmit={onSubmit}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}