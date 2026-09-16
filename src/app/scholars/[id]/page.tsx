import Link from "next/link";

type Scholar = {
  id: number;
  name: string;
  school: string;
  biography: string;
};

export default async function ScholarPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await fetch(
    `http://localhost:3000/api/scholars/${id}`,
    { cache: "no-store" }
  );

  const scholar: Scholar = await response.json();

  return (
    <main className="min-h-screen bg-gray-50 p-8 text-gray-900">
      <div className="mx-auto max-w-3xl">

        <Link
          href="/"
          className="text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          ← Back to Home
        </Link>

        <div className="mt-8 rounded-lg border bg-white p-8 shadow-sm">

          <p className="text-sm font-medium text-gray-500">
            School of Thought
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            {scholar.name}
          </h1>

          <p className="mt-2 text-lg text-gray-600">
            {scholar.school}
          </p>

          <div className="mt-8 border-t pt-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Biography
            </h2>

            <p className="mt-3 leading-7 text-gray-700">
              {scholar.biography}
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}