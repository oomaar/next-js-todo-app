import type { UpdateThemeDTO } from "@/server/dtos/UserDTOs/update-theme.dto";
import type { UserDTO } from "@/server/dtos/UserDTOs/user.dto";

export async function updateThemeAPI(body: UpdateThemeDTO): Promise<{ user: UserDTO }> {
  const res = await fetch("/api/user/theme", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update theme");
  return data;
}