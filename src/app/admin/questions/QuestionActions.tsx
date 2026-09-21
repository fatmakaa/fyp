"use client";

import { useState } from "react";

export default function QuestionActions({
  questionId,
}: {
  questionId: number;
}) {
  const [answer, setAnswer] = useState("");

  async function updateStatus(status: "Approved" | "Rejected") {
    const response = await fetch(`/api/questions/${questionId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
        answer,
      }),
    });

    if (response.ok) {
      window.location.reload();
    } else {
      alert("Failed to update question.");
    }
  }

  return (
    <div className="mt-4">
      <label className="font-semibold text-gray-900">
        Answer
      </label>

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Write an answer..."
        className="mt-2 w-full rounded-lg border bg-white p-3"
        rows={4}
      />

      <div className="mt-4 flex gap-3">
        <button
          onClick={() => updateStatus("Approved")}
          className="rounded-lg bg-green-600 px-4 py-2 text-white"
        >
          Approve
        </button>

        <button
          onClick={() => updateStatus("Rejected")}
          className="rounded-lg bg-red-600 px-4 py-2 text-white"
        >
          Reject
        </button>
      </div>
    </div>
  );
}