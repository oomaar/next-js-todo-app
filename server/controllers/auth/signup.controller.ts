import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/server/db/mongoose";
import User from "@/server/models/User";
import { SignupDTO } from "@/server/dtos/AuthDTOs/signup.dto";
import { AuthResponseDTO } from "@/server/dtos/AuthDTOs/auth-response.dto";

export async function signupController(req: NextRequest): Promise<NextResponse> {
  try {
    const body: SignupDTO = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ message: "name, email and password are required" }, { status: 400 });
    }

    await connectDB();

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ message: "Email already in use" }, { status: 409 });
    }

    const user = await User.create({ name, email, password });

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

    const res = NextResponse.json(response, { status: 201 });
    res.cookies.set("token", token, { httpOnly: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 7 });
    return res;
  } catch (error) {
    console.error("[signup]", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}