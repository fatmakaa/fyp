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
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">
        {topic.question}
      </h1>

      <p className="mt-2 text-gray-600">
        Category: {topic.category}
      </p>

      <h2 className="mt-8 text-2xl font-semibold">
        Comparison of Schools
      </h2>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {topic.opinions.map((opinion) => (
          <section
            key={opinion.id}
            className="rounded-lg border p-6"
          >
            <h3 className="text-xl font-bold">
              {opinion.scholar.school}
            </h3>

            <div className="mt-4 space-y-3">
              <p>
                <strong>Ruling:</strong>{" "}
                {opinion.ruling}
              </p>

              <p>
                <strong>Reasoning:</strong>{" "}
                {opinion.reasoning}
              </p>

              <p>
                <strong>Methodology:</strong>{" "}
                {opinion.methodologyNote}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {opinion.verificationStatus}
              </p>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold">
                Scholar
              </h4>

              <p>{opinion.scholar.name}</p>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold">
                Sources
              </h4>

              {opinion.sources.map((source) => (
                <p key={source.id}>
                  {source.reference}
                </p>
              ))}
            </div>

            <div className="mt-6">
              <h4 className="font-semibold">
                Evidence
              </h4>

              {opinion.evidenceReferences.map(
                (evidence) => (
                  <div
                    key={evidence.id}
                    className="mt-2"
                  >
                    <p className="font-medium">
                      {evidence.title}
                    </p>

                    <p>{evidence.description}</p>

                    <p className="text-sm text-gray-600">
                      Type: {evidence.type}
                    </p>
                  </div>
                )
              )}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}