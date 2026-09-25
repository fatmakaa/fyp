import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();

  const { username, password } = body;

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return Response.json(
      { error: "Invalid username or password" },
      { status: 401 }
    );
  }

  const cookieStore = await cookies();

  cookieStore.set(
    "admin_session",
    process.env.ADMIN_SESSION_TOKEN!,
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    }
  );

  return Response.json({ success: true });
}