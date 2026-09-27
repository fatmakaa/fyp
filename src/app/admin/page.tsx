import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (session?.value !== process.env.ADMIN_SESSION_TOKEN) {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-5xl">

        <header className="mb-10 flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-gray-600">
              Manage the content and submitted questions in the system.
            </p>
          </div>

          <LogoutButton />
        </header>

        <section className="grid gap-6 md:grid-cols-3">

          {/* Question Management */}
          <Link
            href="/admin/questions"
            className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <h2 className="text-xl font-semibold text-gray-900">
              Question Management
            </h2>

            <p className="mt-2 text-gray-600">
              Review submitted questions, provide answers, and approve or
              reject them.
            </p>

            <span className="mt-5 inline-block font-medium text-blue-600">
              Manage Questions →
            </span>
          </Link>

          {/* Topic Management */}
          <Link
            href=""
            className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <h2 className="text-xl font-semibold text-gray-900">
              Update Topics
            </h2>

            <p className="mt-2 text-gray-600">
              Update and manage the legal topics presented in the system.
            </p>

            <span className="mt-5 inline-block font-medium text-blue-600">
              Update Topics →
            </span>
          </Link>

          {/* Scholar Management */}
          <Link
            href=""
            className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <h2 className="text-xl font-semibold text-gray-900">
              Update Scholar Information
            </h2>

            <p className="mt-2 text-gray-600">
              Update scholar information and related school of thought
              content.
            </p>

            <span className="mt-5 inline-block font-medium text-blue-600">
              Update Scholars →
            </span>
          </Link>

        </section>
      </div>
    </main>
  );
}