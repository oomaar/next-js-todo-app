export type Theme = "light" | "dark" | "system";

export type UserDTO = {
  id: string;
  name: string;
  email: string;
  theme: Theme;
  createdAt: string;
  updatedAt: string;
};