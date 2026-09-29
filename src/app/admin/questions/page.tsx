import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import QuestionActions from "./QuestionActions";
import Link from "next/link";

export default async function AdminQuestionsPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (session?.value !== process.env.ADMIN_SESSION_TOKEN) {
    redirect("/admin/login");
  }

  const questions = await prisma.submittedQuestion.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-gray-50 p-8 text-gray-900">
      <div className="mx-auto max-w-5xl">


       <Link
                  href="/admin"
        className="mb-6 inline-block text-sm font-medium text-blue-600 hover:underline"
                >
                  ← Back to Admin page
                </Link>


        <h1 className="text-3xl font-bold">
          Submitted Questions
        </h1>

        <p className="mt-2 text-gray-600">
          Review questions submitted by users.
        </p>

        <div className="mt-8 space-y-4">

          {questions.map((question) => (
            <div
              key={question.id}
              className="rounded-lg border bg-white p-6 shadow-sm"
            >
              <p className="text-lg font-medium">
                {question.question}
              </p>

              <p className="mt-3 text-sm text-gray-600">
                Status: {question.status}
              </p>

              <QuestionActions
                questionId={question.id}
              />

              <p className="mt-1 text-sm text-gray-500">
                Submitted:{" "}
                {question.createdAt.toLocaleString()}
              </p>
            </div>
          ))}

        </div>

      </div>
    </main>
  );
}