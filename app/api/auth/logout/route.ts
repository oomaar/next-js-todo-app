import { logoutController } from "@/server/controllers/auth/logout.controller";

export async function POST() {
  return logoutController();
}