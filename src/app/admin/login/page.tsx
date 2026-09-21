"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (response.ok) {
      router.push("/admin/questions");
    } else {
      setError("Invalid username or password.");
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8 text-gray-900">
      <div className="mx-auto max-w-md">

        <h1 className="text-3xl font-bold">
          Admin Login
        </h1>

        <form
          onSubmit={handleLogin}
          className="mt-8 rounded-lg border bg-white p-6 shadow-sm"
        >

          <label className="font-semibold">
            Username
          </label>

          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-2 w-full rounded-lg border p-3"
            type="text"
          />

          <label className="mt-5 block font-semibold">
            Password
          </label>

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-lg border p-3"
            type="password"
          />

          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-black px-6 py-3 text-white"
          >
            Login
          </button>

          {error && (
            <p className="mt-4 text-red-600">
              {error}
            </p>
          )}

        </form>
      </div>
    </main>
  );
}