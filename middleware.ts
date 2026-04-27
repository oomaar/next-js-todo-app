import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest): Promise<NextResponse> {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    const userId = payload.id as string;

    const headers = new Headers(req.headers);
    headers.set("x-user-id", userId);

    return NextResponse.next({ request: { headers } });
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}

export const config = {
  matcher: ["/api/user/:path*", "/api/todos/:path*"],
};