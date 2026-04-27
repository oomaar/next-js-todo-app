import { NextRequest } from "next/server";
import { loginController } from "@/server/controllers/auth/login.controller";

export async function POST(req: NextRequest) {
  return loginController(req);
}