"use client";

export default function QuestionActions({
  questionId,
}: {
  questionId: number;
}) {
  async function updateStatus(status: "Approved" | "Rejected") {
    const response = await fetch(`/api/questions/${questionId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (response.ok) {
      window.location.reload();
    } else {
      alert("Failed to update question status.");
    }
  }

  return (
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
  );
}