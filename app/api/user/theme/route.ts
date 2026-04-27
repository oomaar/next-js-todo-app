import { NextRequest } from "next/server";
import { updateThemeController } from "@/server/controllers/user/update-theme.controller";

export async function PATCH(req: NextRequest) {
  return updateThemeController(req);
}