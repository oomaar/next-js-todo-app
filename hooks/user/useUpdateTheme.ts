"use client";

import { useMutation } from "@tanstack/react-query";
import { updateThemeAPI } from "@/lib/api/user.api";

export function useUpdateTheme() {
  return useMutation({ mutationFn: updateThemeAPI });
}