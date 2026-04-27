import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/server/db/mongoose";
import User from "@/server/models/User";
import { LoginDTO } from "@/server/dtos/AuthDTOs/login.dto";
import { AuthResponseDTO } from "@/server/dtos/AuthDTOs/auth-response.dto";

export async function loginController(req: NextRequest): Promise<NextResponse> {
  try {
    const body: LoginDTO = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: "email and password are required" }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const valid = await user.comparePassword(password);
    if (!valid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "7d" });

    const response: AuthResponseDTO = {
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        theme: user.theme,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      },
      token,
    };

    const res = NextResponse.json(response, { status: 200 });
    res.cookies.set("token", token, { httpOnly: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 7 });
    return res;
  } catch (error) {
    console.error("[login]", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}