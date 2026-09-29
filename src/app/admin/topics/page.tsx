"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Topic = {
  id: number;
  question: string;
  category: string;
};

export default function AdminTopicsPage() {
  const [topics, setTopics] = useState<Topic[]>([]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("");

  const [newQuestion, setNewQuestion] = useState("");
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    async function loadTopics() {
      const response = await fetch("/api/topics");
      const data = await response.json();
      setTopics(data);
    }

    loadTopics();
  }, []);

  function startEditing(topic: Topic) {
    setEditingId(topic.id);
    setQuestion(topic.question);
    setCategory(topic.category);
  }

  function cancelEditing() {
    setEditingId(null);
    setQuestion("");
    setCategory("");
  }

  async function updateTopic() {
    const response = await fetch("/api/admin/topics", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: editingId,
        question,
        category,
      }),
    });

    if (!response.ok) {
      alert("Failed to update topic.");
      return;
    }

    const updatedTopic = await response.json();

    setTopics((currentTopics) =>
      currentTopics.map((topic) =>
        topic.id === updatedTopic.id ? updatedTopic : topic
      )
    );

    cancelEditing();
  }

  async function addTopic() {
    if (!newQuestion.trim() || !newCategory.trim()) {
      alert("Question and category are required.");
      return;
    }

    const response = await fetch("/api/admin/topics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: newQuestion,
        category: newCategory,
      }),
    });

    if (!response.ok) {
      alert("Failed to add topic.");
      return;
    }

    const newTopic = await response.json();

    setTopics((currentTopics) => [...currentTopics, newTopic]);

    setNewQuestion("");
    setNewCategory("");
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-5xl">

<Link
        href="/admin"
        className="mb-6 inline-block text-sm font-medium text-blue-600 hover:underline"
      >
        ← Back to Admin
      </Link>



        <header className="mb-10">

          <h1 className="text-4xl font-bold text-gray-900">
            Manage Topics
          </h1>

          <p className="mt-2 text-gray-600">
            Add new topics or update existing topics in the system.
          </p>
        </header>

        {/* Add New Topic */}
        <section className="mb-10 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900">
            Add New Topic
          </h2>

          <div className="mt-5 space-y-4">

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Question
              </label>

              <input
                type="text"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="Enter the legal question"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>

              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="e.g. Prayer"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </div>

            <button
              onClick={addTopic}
              className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
            >
              Add Topic
            </button>

          </div>
        </section>

        {/* Existing Topics */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Existing Topics
          </h2>

          {topics.map((topic) => (
            <div
              key={topic.id}
              className="rounded-xl border bg-white p-6 shadow-sm"
            >
              {editingId === topic.id ? (
                <div className="space-y-4">

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Question
                    </label>

                    <input
                      type="text"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Category
                    </label>

                    <input
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                    />
                  </div>

                  <div className="flex gap-3">

                    <button
                      onClick={updateTopic}
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
                    {topic.question}
                  </h3>

                  <p className="mt-2 text-sm text-gray-600">
                    Category: {topic.category}
                  </p>

                  <button
                    onClick={() => startEditing(topic)}
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