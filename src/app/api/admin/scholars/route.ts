import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

async function checkAdmin() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  return session?.value === process.env.ADMIN_SESSION_TOKEN;
}

export async function GET() {
  const isAdmin = await checkAdmin();

  if (!isAdmin) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const scholars = await prisma.scholar.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return Response.json(scholars);
}

export async function POST(request: Request) {
  const isAdmin = await checkAdmin();

  if (!isAdmin) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await request.json();

  const name = body.name;
  const school = body.school;
  const biography = body.biography;

  if (!name || !school || !biography) {
    return Response.json(
      { error: "Name, school and biography are required" },
      { status: 400 }
    );
  }

  const scholar = await prisma.scholar.create({
    data: {
      name: name.trim(),
      school: school.trim(),
      biography: biography.trim(),
    },
  });

  return Response.json(scholar, { status: 201 });
}

export async function PATCH(request: Request) {
  const isAdmin = await checkAdmin();

  if (!isAdmin) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await request.json();

  const id = Number(body.id);
  const name = body.name;
  const school = body.school;
  const biography = body.biography;

  if (!id || !name || !school || !biography) {
    return Response.json(
      { error: "Name, school and biography are required" },
      { status: 400 }
    );
  }

  const scholar = await prisma.scholar.update({
    where: {
      id: id,
    },
    data: {
      name: name.trim(),
      school: school.trim(),
      biography: biography.trim(),
    },
  });

  return Response.json(scholar);
}