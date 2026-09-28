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

  const opinions = await prisma.opinion.findMany({
    include: {
      topic: true,
      scholar: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  return Response.json(opinions);
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

  const topicId = Number(body.topicId);
  const scholarId = Number(body.scholarId);
  const ruling = body.ruling;
  const reasoning = body.reasoning;
  const methodologyNote = body.methodologyNote;

  if (
    !topicId ||
    !scholarId ||
    !ruling ||
    !reasoning ||
    !methodologyNote
  ) {
    return Response.json(
      { error: "All opinion fields are required" },
      { status: 400 }
    );
  }

  const opinion = await prisma.opinion.create({
    data: {
      topicId,
      scholarId,
      ruling: ruling.trim(),
      reasoning: reasoning.trim(),
      methodologyNote: methodologyNote.trim(),
    },
    include: {
      topic: true,
      scholar: true,
    },
  });

  return Response.json(opinion, { status: 201 });
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
  const topicId = Number(body.topicId);
  const scholarId = Number(body.scholarId);
  const ruling = body.ruling;
  const reasoning = body.reasoning;
  const methodologyNote = body.methodologyNote;

  if (
    !id ||
    !topicId ||
    !scholarId ||
    !ruling ||
    !reasoning ||
    !methodologyNote
  ) {
    return Response.json(
      { error: "All opinion fields are required" },
      { status: 400 }
    );
  }

  const opinion = await prisma.opinion.update({
    where: {
      id,
    },
    data: {
      topicId,
      scholarId,
      ruling: ruling.trim(),
      reasoning: reasoning.trim(),
      methodologyNote: methodologyNote.trim(),
    },
    include: {
      topic: true,
      scholar: true,
    },
  });

  return Response.json(opinion);
}