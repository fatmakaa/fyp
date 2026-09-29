"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Scholar = {
  id: number;
  name: string;
  school: string;
  biography: string;
};

export default function AdminScholarsPage() {
  const [scholars, setScholars] = useState<Scholar[]>([]);

  const [editingId, setEditingId] = useState<number | null>(null);

  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [biography, setBiography] = useState("");

  const [newName, setNewName] = useState("");
  const [newSchool, setNewSchool] = useState("");
  const [newBiography, setNewBiography] = useState("");

  useEffect(() => {
    async function loadScholars() {
      const response = await fetch("/api/admin/scholars");

      if (!response.ok) {
        return;
      }

      const data = await response.json();
      setScholars(data);
    }

    loadScholars();
  }, []);

  function startEditing(scholar: Scholar) {
    setEditingId(scholar.id);
    setName(scholar.name);
    setSchool(scholar.school);
    setBiography(scholar.biography);
  }

  function cancelEditing() {
    setEditingId(null);
    setName("");
    setSchool("");
    setBiography("");
  }

  async function addScholar() {
    if (
      !newName.trim() ||
      !newSchool.trim() ||
      !newBiography.trim()
    ) {
      alert("Name, school and biography are required.");
      return;
    }

    const response = await fetch("/api/admin/scholars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newName,
        school: newSchool,
        biography: newBiography,
      }),
    });

    if (!response.ok) {
      alert("Failed to add scholar.");
      return;
    }

    const newScholar = await response.json();

    setScholars((currentScholars) => [
      ...currentScholars,
      newScholar,
    ]);

    setNewName("");
    setNewSchool("");
    setNewBiography("");
  }

  async function updateScholar() {
    const response = await fetch("/api/admin/scholars", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: editingId,
        name,
        school,
        biography,
      }),
    });

    if (!response.ok) {
      alert("Failed to update scholar.");
      return;
    }

    const updatedScholar = await response.json();

    setScholars((currentScholars) =>
      currentScholars.map((scholar) =>
        scholar.id === updatedScholar.id
          ? updatedScholar
          : scholar
      )
    );

    cancelEditing();
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-5xl">
      <Link
                        href="/admin"
              className="mb-6 inline-block text-sm font-medium text-blue-600 hover:underline"
                      >
                        ← Back to Admin page
                      </Link>

        <header className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            Manage Scholar Information
          </h1>

          <p className="mt-2 text-gray-600">
            Add new scholars or update existing scholar information.
          </p>
        </header>

        {/* Add New Scholar */}
        <section className="mb-10 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900">
            Add New Scholar
          </h2>

          <div className="mt-5 space-y-4">

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>

              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter scholar name"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                School of Thought
              </label>

              <input
                type="text"
                value={newSchool}
                onChange={(e) => setNewSchool(e.target.value)}
                placeholder="e.g. Hanafi"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Biography
              </label>

              <textarea
                value={newBiography}
                onChange={(e) => setNewBiography(e.target.value)}
                placeholder="Enter scholar biography"
                rows={6}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </div>

            <button
              onClick={addScholar}
              className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
            >
              Add Scholar
            </button>

          </div>
        </section>

        {/* Existing Scholars */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Existing Scholars
          </h2>

          {scholars.map((scholar) => (
            <div
              key={scholar.id}
              className="rounded-xl border bg-white p-6 shadow-sm"
            >
              {editingId === scholar.id ? (
                <div className="space-y-4">

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>

                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      School of Thought
                    </label>

                    <input
                      type="text"
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Biography
                    </label>

                    <textarea
                      value={biography}
                      onChange={(e) => setBiography(e.target.value)}
                      rows={6}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                    />
                  </div>

                  <div className="flex gap-3">

                    <button
                      onClick={updateScholar}
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
                  <h3 className="text-xl font-semibold text-gray-900">
                    {scholar.name}
                  </h3>

                  <p className="mt-2 text-sm font-medium text-blue-600">
                    {scholar.school}
                  </p>

                  <p className="mt-3 text-gray-600">
                    {scholar.biography}
                  </p>

                  <button
                    onClick={() => startEditing(scholar)}
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