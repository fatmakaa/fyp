import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

// User submits a question
export async function POST(request: Request) {
  const body = await request.json();
  const question = body.question;

  if (!question || question.trim() === "") {
    return Response.json(
      { error: "Question is required" },
      { status: 400 }
    );
  }

  const submittedQuestion =
    await prisma.submittedQuestion.create({
      data: {
        question: question.trim(),
        status: "Pending",
      },
    });

  return Response.json(submittedQuestion, { status: 201 });
}

// Public page retrieves approved questions
export async function GET() {
  const questions =
    await prisma.submittedQuestion.findMany({
      where: {
        status: "Approved",
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  return Response.json(questions);
}

// Admin approves or rejects a question
export async function PATCH(request: Request) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (session?.value !== process.env.ADMIN_SESSION_TOKEN) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await request.json();

  const id = Number(body.id);
  const status = body.status;
  const answer = body.answer;

  if (status === "Rejected") {
    await prisma.submittedQuestion.delete({
      where: {
        id: id,
      },
    });

    return Response.json({
      message: "Question rejected and deleted.",
    });
  }

  if (status !== "Approved") {
    return Response.json(
      { error: "Invalid status" },
      { status: 400 }
    );
  }

  if (!answer || answer.trim() === "") {
    return Response.json(
      { error: "An answer is required before approval" },
      { status: 400 }
    );
  }

  const question =
    await prisma.submittedQuestion.update({
      where: {
        id: id,
      },
      data: {
        status: "Approved",
        answer: answer.trim(),
      },
    });

  return Response.json(question);
}