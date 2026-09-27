import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

async function checkAdmin() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  return session?.value === process.env.ADMIN_SESSION_TOKEN;
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

  const question = body.question;
  const category = body.category;

  if (!question || !category) {
    return Response.json(
      { error: "Question and category are required" },
      { status: 400 }
    );
  }

  const topic = await prisma.topic.create({
    data: {
      question: question.trim(),
      category: category.trim(),
    },
  });

  return Response.json(topic, { status: 201 });
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
  const question = body.question;
  const category = body.category;

  if (!id || !question || !category) {
    return Response.json(
      { error: "Question and category are required" },
      { status: 400 }
    );
  }

  const topic = await prisma.topic.update({
    where: {
      id: id,
    },
    data: {
      question: question.trim(),
      category: category.trim(),
    },
  });

  return Response.json(topic);
}