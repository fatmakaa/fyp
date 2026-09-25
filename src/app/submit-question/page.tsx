"use client";

import { useState } from "react";

export default function SubmitQuestionPage() {
  const [question, setQuestion] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const response = await fetch("/api/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: question,
      }),
    });

    if (response.ok) {
      setMessage("Question submitted successfully.");
      setQuestion("");
    } else {
      setMessage("Please enter a valid question.");
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8 text-gray-900">
      <div className="mx-auto max-w-2xl">

        <h1 className="text-3xl font-bold">
          Submit a Question
        </h1>

        <p className="mt-3 text-gray-600">
          Submit an Islamic legal question for review.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8"
        >
          <label className="font-semibold">
            Your Question
          </label>

          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Write your question here..."
            className="mt-2 w-full rounded-lg border bg-white p-4"
            rows={6}
          />

          <button
            type="submit"
            className="mt-4 rounded-lg bg-black px-6 py-3 text-white"
          >
            Submit Question
          </button>

          {message && (
            <p className="mt-4 text-gray-700">
              {message}
            </p>
          )}

        </form>

      </div>
    </main>
  );
}