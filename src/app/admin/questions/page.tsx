"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Question = {
  id: number;
  question: string;
  answer: string | null;
  status: string;
  createdAt: string;
};

export default function AdminQuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);

  async function loadQuestions() {
    const response = await fetch("/api/questions");

    if (!response.ok) {
      return;
    }

    const data = await response.json();
    setQuestions(data);
    setLoading(false);
  }

  useEffect(() => {
    loadQuestions();
  }, []);

  function handleAnswerChange(id: number, value: string) {
    setAnswers((current) => ({
      ...current,
      [id]: value,
    }));
  }

  async function approveQuestion(id: number) {
    const answer = answers[id];

    if (!answer || answer.trim() === "") {
      alert("An answer is required before approval.");
      return;
    }

    const response = await fetch("/api/questions", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        status: "Approved",
        answer,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      alert(data.error || "Failed to approve question.");
      return;
    }

    await loadQuestions();
  }

  async function rejectQuestion(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to reject this question?"
    );

    if (!confirmed) {
      return;
    }

    const response = await fetch("/api/questions", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        status: "Rejected",
      }),
    });

    if (!response.ok) {
      alert("Failed to reject question.");
      return;
    }

    await loadQuestions();
  }

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

        {loading ? (
          <p className="mt-8 text-gray-600">
            Loading questions...
          </p>
        ) : (
          <div className="mt-8 space-y-4">

            {questions.length === 0 ? (
              <p className="rounded-lg border bg-white p-6 text-gray-600">
                No submitted questions.
              </p>
            ) : (
              questions.map((question) => (
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

                  {question.status === "Pending" && (
                    <div className="mt-5">

                      <label className="block text-sm font-medium text-gray-700">
                        Answer
                      </label>

                      <textarea
                        value={answers[question.id] || ""}
                        onChange={(e) =>
                          handleAnswerChange(
                            question.id,
                            e.target.value
                          )
                        }
                        rows={4}
                        placeholder="Enter an answer"
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                      />

                      <div className="mt-4 flex gap-3">

                        <button
                          onClick={() =>
                            approveQuestion(question.id)
                          }
                          className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() =>
                            rejectQuestion(question.id)
                          }
                          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                        >
                          Reject
                        </button>

                      </div>
                    </div>
                  )}

                  {question.status === "Approved" && (
                    <div className="mt-4 rounded-lg bg-gray-50 p-4">
                      <p className="text-sm font-medium text-gray-700">
                        Answer
                      </p>

                      <p className="mt-1 text-gray-600">
                        {question.answer}
                      </p>
                    </div>
                  )}

                  <p className="mt-4 text-sm text-gray-500">
                    Submitted:{" "}
                    {new Date(question.createdAt).toLocaleString()}
                  </p>
                </div>
              ))
            )}

          </div>
        )}

      </div>
    </main>
  );
}