import Link from "next/link";

type Topic = {
  id: number;
  question: string;
  category: string;
};

export default async function Home() {
  const response = await fetch(
    "http://localhost:3000/api/topics",
    { cache: "no-store" }
  );

  const topics: Topic[] = await response.json();

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Header */}
      <section className="border-b bg-white">
        <div className="mx-auto max-w-5xl px-8 py-16">
          <h1 className="text-4xl font-bold">
            Islamic Legal Information System
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            A structured system for comparing legal opinions
            from the four Sunni schools of thought.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-5xl px-8 py-12">
        <h2 className="text-2xl font-semibold">
          How It Works
        </h2>

        <div className="mt-6 grid gap-6 md:grid-cols-3">

          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-lg font-semibold">
              1. Choose a Topic
            </h3>
            <p className="mt-2 text-gray-600">
              Select an Islamic legal question from the available topics.
            </p>
          </div>

          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-lg font-semibold">
              2. Compare Opinions
            </h3>
            <p className="mt-2 text-gray-600">
              View the opinions of the four Sunni schools of thought side by side.
            </p>
          </div>

          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-lg font-semibold">
              3. Review Sources
            </h3>
            <p className="mt-2 text-gray-600">
              Explore the sources and evidence associated with each opinion.
            </p>
          </div>

        </div>
      </section>

      {/* Topics */}
      <section className="mx-auto max-w-5xl px-8 pb-12">
        <h2 className="text-2xl font-semibold">
          Available Topics
        </h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2">

          {topics.map((topic) => (
            <Link
              key={topic.id}
              href={`/topics/${topic.id}`}
              className="rounded-lg border bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <h3 className="text-xl font-semibold">
                {topic.question}
              </h3>

              <p className="mt-2 text-gray-600">
                Category: {topic.category}
              </p>

              <p className="mt-4 font-medium">
                View comparison →
              </p>
            </Link>
          ))}

        </div>
      </section>

      {/* About the system */}
      <section className="border-t bg-white">
        <div className="mx-auto max-w-5xl px-8 py-12">

          <h2 className="text-2xl font-semibold">
            About the System
          </h2>

          <p className="mt-4 max-w-3xl leading-7 text-gray-600">
            This system presents information from the four Sunni
            schools of thought in a structured and comparative format.
            It is designed to support learning and comparison by
            connecting legal opinions with their scholars, sources,
            and evidence.
          </p>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto max-w-5xl px-8 py-6 text-sm text-gray-500">
          Final Year Project — Islamic Legal Information System
        </div>
      </footer>

    </main>
  );
}