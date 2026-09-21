import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (session?.value !== process.env.ADMIN_SESSION_TOKEN) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;
  const body = await request.json();

  const status = body.status;
  const answer = body.answer;

  if (status !== "Approved" && status !== "Rejected") {
    return Response.json(
      { error: "Invalid status" },
      { status: 400 }
    );
  }

  if (status === "Approved" && (!answer || answer.trim() === "")) {
    return Response.json(
      { error: "An answer is required before approval" },
      { status: 400 }
    );
  }

  const question = await prisma.submittedQuestion.update({
    where: {
      id: Number(id),
    },
    data: {
      status: status,
      answer: answer ? answer.trim() : null,
    },
  });

  return Response.json(question);
}