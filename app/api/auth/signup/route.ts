import { NextRequest } from "next/server";
import { signupController } from "@/server/controllers/auth/signup.controller";

export async function POST(req: NextRequest) {
  return signupController(req);
}
