import prisma from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const status = body.status;

  if (status !== "Approved" && status !== "Rejected") {
    return Response.json(
      { error: "Invalid status" },
      { status: 400 }
    );
  }

  const question = await prisma.submittedQuestion.update({
    where: {
      id: Number(id),
    },
    data: {
      status: status,
    },
  });

  return Response.json(question);
}