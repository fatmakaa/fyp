import Link from "next/link";

type Topic = {
  id: number;
  question: string;
  category: string;
  opinions: Opinion[];
};

type Opinion = {
  id: number;
  ruling: string;
  reasoning: string;
  methodologyNote: string;
  verificationStatus: string;
  scholar: Scholar;
  sources: Source[];
  evidenceReferences: EvidenceReference[];
};

type Scholar = {
  id: number;
  name: string;
  school: string;
};

type Source = {
  id: number;
  reference: string;
};

type EvidenceReference = {
  id: number;
  type: string;
  title: string;
  description: string;
  url: string;
};

export default async function TopicPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await fetch(
    `http://localhost:3000/api/topics/${id}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    return (
      <main className="min-h-screen bg-gray-50 p-8 text-gray-900">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            ← Back to Topics
          </Link>

          <h1 className="mt-8 text-3xl font-bold">
            Topic not found
          </h1>
        </div>
      </main>
    );
  }

  const topic: Topic = await response.json();

  return (
    <main className="min-h-screen bg-gray-50 p-8 text-gray-900">
      <div className="mx-auto max-w-6xl">

        <Link
          href="/"
          className="text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          ← Back to Topics
        </Link>

        <div className="mt-6">
          <h1 className="text-4xl font-bold">
            {topic.question}
          </h1>

          <p className="mt-2 text-gray-600">
            Category: {topic.category}
          </p>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold">
            Comparison of Schools of Thought
          </h2>

          <p className="mt-2 text-gray-600">
            The following section presents the available opinions
            together with their scholars, sources, and evidence.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">

          {topic.opinions.map((opinion) => (
            <section
              key={opinion.id}
              className="rounded-lg border bg-white p-6 shadow-sm"
            >

              <div className="border-b pb-5">
                <h3 className="text-2xl font-bold">
                  {opinion.scholar.school}
                </h3>

                <Link
                  href={`/scholars/${opinion.scholar.id}`}
                  className="mt-2 inline-block text-lg text-blue-600 underline hover:text-blue-800"
                >
                  {opinion.scholar.name}
                </Link>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold">
                  Ruling
                </h4>

                <p className="mt-2 text-gray-700">
                  {opinion.ruling}
                </p>
              </div>

              <div className="mt-5">
                <h4 className="font-semibold">
                  Reasoning
                </h4>

                <p className="mt-2 text-gray-700">
                  {opinion.reasoning}
                </p>
              </div>

              <div className="mt-5">
                <h4 className="font-semibold">
                  Methodology
                </h4>

                <p className="mt-2 text-gray-700">
                  {opinion.methodologyNote}
                </p>
              </div>

              <div className="mt-5">
                <h4 className="font-semibold">
                  Verification Status
                </h4>

                <p className="mt-2 text-gray-700">
                  {opinion.verificationStatus}
                </p>
              </div>

              <div className="mt-6 border-t pt-5">
                <h4 className="font-semibold">
                  Sources
                </h4>

                <div className="mt-2 space-y-1">
                  {opinion.sources.map((source) => (
                    <p
                      key={source.id}
                      className="text-gray-700"
                    >
                      {source.reference}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t pt-5">
                <h4 className="font-semibold">
                  Evidence
                </h4>

                <div className="mt-2 space-y-3">
                  {opinion.evidenceReferences.map((evidence) => (
                    <div key={evidence.id}>
                      <p className="font-medium">
                        {evidence.title}
                      </p>

                      <p className="mt-1 text-gray-700">
                        {evidence.description}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Type: {evidence.type}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </section>
          ))}

        </div>
      </div>
    </main>
  );
}