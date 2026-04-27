import { NextResponse } from "next/server";

export function logoutController(): NextResponse {
  try {
    const res = NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
    res.cookies.set("token", "", { httpOnly: true, sameSite: "lax", maxAge: 0 });
    return res;
  } catch (error) {
    console.error("[logout]", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}