import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const scholar = await prisma.scholar.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!scholar) {
    return Response.json(
      { error: "Scholar not found" },
      { status: 404 }
    );
  }

  return Response.json(scholar);
}