"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodoAPI } from "@/lib/api/todos.api";
import { todosQueryKey } from "./useGetTodos";
import type { UpdateTodoDTO } from "@/server/dtos/TodoDTOs/update-todo.dto";

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateTodoDTO }) =>
      updateTodoAPI(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todosQueryKey });
    },
  });
}