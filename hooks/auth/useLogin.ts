"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginAPI } from "@/lib/api/auth.api";

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: loginAPI,
    onSuccess: (data) => {
      localStorage.setItem("theme", data.user.theme);
      router.push("/");
    },
  });
}