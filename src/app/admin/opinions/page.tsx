"use client";

import { useEffect, useState } from "react";

type Topic = {
  id: number;
  question: string;
  category: string;
};

type Scholar = {
  id: number;
  name: string;
  school: string;
  biography: string;
};

type Opinion = {
  id: number;
  topicId: number;
  scholarId: number;
  ruling: string;
  reasoning: string;
  methodologyNote: string;
  topic: Topic;
  scholar: Scholar;
};

export default function AdminOpinionsPage() {
  const [opinions, setOpinions] = useState<Opinion[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [scholars, setScholars] = useState<Scholar[]>([]);

  const [editingId, setEditingId] = useState<number | null>(null);

  const [topicId, setTopicId] = useState("");
  const [scholarId, setScholarId] = useState("");
  const [ruling, setRuling] = useState("");
  const [reasoning, setReasoning] = useState("");
  const [methodologyNote, setMethodologyNote] = useState("");

  const [newTopicId, setNewTopicId] = useState("");
  const [newScholarId, setNewScholarId] = useState("");
  const [newRuling, setNewRuling] = useState("");
  const [newReasoning, setNewReasoning] = useState("");
  const [newMethodologyNote, setNewMethodologyNote] = useState("");

  useEffect(() => {
    async function loadData() {
      const [opinionsResponse, topicsResponse, scholarsResponse] =
        await Promise.all([
          fetch("/api/admin/opinions"),
          fetch("/api/topics"),
          fetch("/api/admin/scholars"),
        ]);

      if (
        !opinionsResponse.ok ||
        !topicsResponse.ok ||
        !scholarsResponse.ok
      ) {
        return;
      }

      const opinionsData = await opinionsResponse.json();
      const topicsData = await topicsResponse.json();
      const scholarsData = await scholarsResponse.json();

      setOpinions(opinionsData);
      setTopics(topicsData);
      setScholars(scholarsData);
    }

    loadData();
  }, []);

  function startEditing(opinion: Opinion) {
    setEditingId(opinion.id);
    setTopicId(String(opinion.topicId));
    setScholarId(String(opinion.scholarId));
    setRuling(opinion.ruling);
    setReasoning(opinion.reasoning);
    setMethodologyNote(opinion.methodologyNote);
  }

  function cancelEditing() {
    setEditingId(null);
    setTopicId("");
    setScholarId("");
    setRuling("");
    setReasoning("");
    setMethodologyNote("");
  }

  async function addOpinion() {
    if (
      !newTopicId ||
      !newScholarId ||
      !newRuling.trim() ||
      !newReasoning.trim() ||
      !newMethodologyNote.trim()
    ) {
      alert("All opinion fields are required.");
      return;
    }

    const response = await fetch("/api/admin/opinions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topicId: Number(newTopicId),
        scholarId: Number(newScholarId),
        ruling: newRuling,
        reasoning: newReasoning,
        methodologyNote: newMethodologyNote,
      }),
    });

    if (!response.ok) {
      alert("Failed to add opinion.");
      return;
    }

    const newOpinion = await response.json();

    setOpinions((currentOpinions) => [
      ...currentOpinions,
      newOpinion,
    ]);

    setNewTopicId("");
    setNewScholarId("");
    setNewRuling("");
    setNewReasoning("");
    setNewMethodologyNote("");
  }

  async function updateOpinion() {
    const response = await fetch("/api/admin/opinions", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: editingId,
        topicId: Number(topicId),
        scholarId: Number(scholarId),
        ruling,
        reasoning,
        methodologyNote,
      }),
    });

    if (!response.ok) {
      alert("Failed to update opinion.");
      return;
    }

    const updatedOpinion = await response.json();

    setOpinions((currentOpinions) =>
      currentOpinions.map((opinion) =>
        opinion.id === updatedOpinion.id
          ? updatedOpinion
          : opinion
      )
    );

    cancelEditing();
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">

        <header className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            Manage Opinions
          </h1>

          <p className="mt-2 text-gray-600">
            Add new legal opinions or update existing opinions.
          </p>
        </header>

        {/* Add New Opinion */}
        <section className="mb-10 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900">
            Add New Opinion
          </h2>

          <div className="mt-5 space-y-4">

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Topic
              </label>

              <select
                value={newTopicId}
                onChange={(e) => setNewTopicId(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
              >
                <option value="">Select a topic</option>

                {topics.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.question}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Scholar
              </label>

              <select
                value={newScholarId}
                onChange={(e) => setNewScholarId(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
              >
                <option value="">Select a scholar</option>

                {scholars.map((scholar) => (
                  <option key={scholar.id} value={scholar.id}>
                    {scholar.name} ({scholar.school})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ruling
              </label>

              <textarea
                value={newRuling}
                onChange={(e) => setNewRuling(e.target.value)}
                rows={4}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Reasoning
              </label>

              <textarea
                value={newReasoning}
                onChange={(e) => setNewReasoning(e.target.value)}
                rows={5}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Methodology Note
              </label>

              <textarea
                value={newMethodologyNote}
                onChange={(e) =>
                  setNewMethodologyNote(e.target.value)
                }
                rows={4}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </div>

            <button
              onClick={addOpinion}
              className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
            >
              Add Opinion
            </button>
          </div>
        </section>

        {/* Existing Opinions */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Existing Opinions
          </h2>

          {opinions.map((opinion) => (
            <div
              key={opinion.id}
              className="rounded-xl border bg-white p-6 shadow-sm"
            >
              {editingId === opinion.id ? (
                <div className="space-y-4">

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Topic
                    </label>

                    <select
                      value={topicId}
                      onChange={(e) => setTopicId(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                    >
                      {topics.map((topic) => (
                        <option key={topic.id} value={topic.id}>
                          {topic.question}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Scholar
                    </label>

                    <select
                      value={scholarId}
                      onChange={(e) => setScholarId(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                    >
                      {scholars.map((scholar) => (
                        <option key={scholar.id} value={scholar.id}>
                          {scholar.name} ({scholar.school})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Ruling
                    </label>

                    <textarea
                      value={ruling}
                      onChange={(e) => setRuling(e.target.value)}
                      rows={4}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Reasoning
                    </label>

                    <textarea
                      value={reasoning}
                      onChange={(e) => setReasoning(e.target.value)}
                      rows={5}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Methodology Note
                    </label>

                    <textarea
                      value={methodologyNote}
                      onChange={(e) =>
                        setMethodologyNote(e.target.value)
                      }
                      rows={4}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                    />
                  </div>

                  <div className="flex gap-3">

                    <button
                      onClick={updateOpinion}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                      Save
                    </button>

                    <button
                      onClick={cancelEditing}
                      className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                    >
                      Cancel
                    </button>

                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {opinion.topic.question}
                  </h3>

                  <p className="mt-1 text-sm font-medium text-blue-600">
                    {opinion.scholar.name} ({opinion.scholar.school})
                  </p>

                  <p className="mt-4 text-sm font-semibold text-gray-700">
                    Ruling
                  </p>

                  <p className="mt-1 text-gray-600">
                    {opinion.ruling}
                  </p>

                  <button
                    onClick={() => startEditing(opinion)}
                    className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Update
                  </button>
                </>
              )}
            </div>
          ))}
        </section>

      </div>
    </main>
  );
}