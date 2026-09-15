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

  const topic: Topic = await response.json();

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-8">
      <div className="mx-auto max-w-6xl">

        {/* Back to Topics */}
        <Link
          href="/"
          className="text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          ← Back to Topics
        </Link>

        {/* Topic Information */}
        <div className="mt-6">
          <h1 className="text-4xl font-bold text-gray-900">
            {topic.question}
          </h1>

          <p className="mt-2 text-gray-600">
            Category: {topic.category}
          </p>
        </div>

        {/* Comparison Introduction */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">
            Comparison of Schools of Thought
          </h2>

          <p className="mt-2 text-gray-600">
            The following section presents the available opinions
            together with their scholars, sources, and evidence.
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">

          {topic.opinions.map((opinion) => (     // map() to go through each opinion and generate a comparison card dynamically.
            <section
              key={opinion.id}
              className="rounded-lg border bg-white p-6 shadow-sm"
            >

              {/* School and Scholar */}
              <div className="border-b pb-5">

                <h3 className="text-2xl font-bold text-gray-900">
                  {opinion.scholar.school}
                </h3>

                <Link
                  href={`/scholars/${opinion.scholar.id}`}
                  className="mt-2 inline-block text-lg text-blue-600 underline hover:text-blue-800"
                >
                  {opinion.scholar.name}
                </Link>

              </div>

              {/* Ruling */}
              <div className="mt-6">
                <h4 className="font-semibold text-gray-900">
                  Ruling
                </h4>

                <p className="mt-2 text-gray-700">
                  {opinion.ruling}
                </p>
              </div>

              {/* Reasoning */}
              <div className="mt-5">
                <h4 className="font-semibold text-gray-900">
                  Reasoning
                </h4>

                <p className="mt-2 text-gray-700">
                  {opinion.reasoning}
                </p>
              </div>

              {/* Methodology */}
              <div className="mt-5">
                <h4 className="font-semibold text-gray-900">
                  Methodology
                </h4>

                <p className="mt-2 text-gray-700">
                  {opinion.methodologyNote}
                </p>
              </div>

              {/* Verification Status */}
              <div className="mt-5">
                <h4 className="font-semibold text-gray-900">
                  Verification Status
                </h4>

                <p className="mt-2 text-gray-700">
                  {opinion.verificationStatus}
                </p>
              </div>

              {/* Sources */}
              <div className="mt-6 border-t pt-5">
                <h4 className="font-semibold text-gray-900">
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

              {/* Evidence */}
              <div className="mt-6 border-t pt-5">
                <h4 className="font-semibold text-gray-900">
                  Evidence
                </h4>

                <div className="mt-2 space-y-3">
                  {opinion.evidenceReferences.map((evidence) => (
                    <div key={evidence.id}>

                      <p className="font-medium text-gray-900">
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