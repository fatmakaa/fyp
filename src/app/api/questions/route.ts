import prisma from "@/lib/prisma";

export async function POST(request: Request) {  //post request geldiğinde bunu çalıştır

  const body = await request.json(); //frontend gelen veriyi alıyor
  const question = body.question;

  if (!question || question.trim() === "") {   //validation, in case its empty
    return Response.json(
      { error: "Question is required" },
      { status: 400 }
    );
  }

  const submittedQuestion = await prisma.submittedQuestion.create({
    data: {
      question: question.trim(),
      status: "Pending",
    },
  });

  return Response.json(submittedQuestion, { status: 201 });
}

export async function GET() {
  const questions = await prisma.submittedQuestion.findMany({
    where: {
      status: "Approved",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return Response.json(questions);
}


//route.ts basically requesti alır, kontrol eder, database işler, response döndürür




