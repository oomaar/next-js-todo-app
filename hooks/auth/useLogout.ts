"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { logoutAPI } from "@/lib/api/auth.api";

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      queryClient.clear();
      router.push("/login");
    },
  });
}