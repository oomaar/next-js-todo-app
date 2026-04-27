"use client";

import { useQuery } from "@tanstack/react-query";
import { getTodosAPI } from "@/lib/api/todos.api";

export const todosQueryKey = ["todos"] as const;

export function useGetTodos() {
  return useQuery({
    queryKey: todosQueryKey,
    queryFn: () => getTodosAPI(1, 100),
  });
}