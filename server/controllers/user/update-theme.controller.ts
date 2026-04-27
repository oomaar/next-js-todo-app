import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/server/db/mongoose";
import User from "@/server/models/User";
import { UpdateThemeDTO } from "@/server/dtos/UserDTOs/update-theme.dto";
import { Theme } from "@/server/dtos/UserDTOs/user.dto";

const VALID_THEMES: Theme[] = ["light", "dark", "system"];

export async function updateThemeController(req: NextRequest): Promise<NextResponse> {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

    const body: UpdateThemeDTO = await req.json();
    const { theme } = body;

    if (!theme || !VALID_THEMES.includes(theme)) {
      return NextResponse.json(
        { message: `theme must be one of: ${VALID_THEMES.join(", ")}` },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findByIdAndUpdate(
      payload.id,
      { theme },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          theme: user.theme,
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt.toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    if ((error as Error).name === "JsonWebTokenError" || (error as Error).name === "TokenExpiredError") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    console.error("[update-theme]", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}