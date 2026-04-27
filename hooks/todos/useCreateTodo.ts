"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodoAPI } from "@/lib/api/todos.api";
import { todosQueryKey } from "./useGetTodos";

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodoAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todosQueryKey });
    },
  });
}