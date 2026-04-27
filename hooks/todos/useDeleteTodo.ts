"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodoAPI } from "@/lib/api/todos.api";
import { todosQueryKey } from "./useGetTodos";

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodoAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todosQueryKey });
    },
  });
}