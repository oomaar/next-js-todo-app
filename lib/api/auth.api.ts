import type { LoginDTO } from "@/server/dtos/AuthDTOs/login.dto";
import type { SignupDTO } from "@/server/dtos/AuthDTOs/signup.dto";
import type { AuthResponseDTO } from "@/server/dtos/AuthDTOs/auth-response.dto";

async function handleResponse<T>(res: Response): Promise<T> {
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data as T;
}

export async function loginAPI(body: LoginDTO): Promise<AuthResponseDTO> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return handleResponse<AuthResponseDTO>(res);
}

export async function signupAPI(body: SignupDTO): Promise<AuthResponseDTO> {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return handleResponse<AuthResponseDTO>(res);
}

export async function logoutAPI(): Promise<void> {
  await fetch("/api/auth/logout", { method: "POST" });
}