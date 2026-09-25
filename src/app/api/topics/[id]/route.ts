import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const topic = await prisma.topic.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      opinions: {
        include: {
          scholar: true,
          sources: true,
          evidenceReferences: true,
        },
      },
    },
  });

  if (!topic) {
    return Response.json(
      { error: "Topic not found" },
      { status: 404 }
    );
  }

  return Response.json(topic);
}