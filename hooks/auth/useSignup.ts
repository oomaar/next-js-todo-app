"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signupAPI } from "@/lib/api/auth.api";

export function useSignup() {
  const router = useRouter();

  return useMutation({
    mutationFn: signupAPI,
    onSuccess: (data) => {
      localStorage.setItem("theme", data.user.theme);
      router.push("/");
    },
  });
}