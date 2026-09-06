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

export default async function TopicPage({
params,
}: {
params: Promise< {id: string}>;
}) {
const {id} = await params;

const response = await fetch(

    `http://localhost:3000/api/topics/${id}`,

    { cache: "no-store" }

  );

  const topic: Topic = await response.json();

    return (

      <main>

        <h2>Opinions</h2>

        {topic.opinions.map((opinion) => (
          <div key={opinion.id}>
            <p>Ruling: {opinion.ruling}</p>
            <p>Reasoning: {opinion.reasoning}</p>
            <p>Methodology: {opinion.methodologyNote}</p>
            <p>Status: {opinion.verificationStatus}</p>

            <h3>Scholar</h3>
            <p>Name: {opinion.scholar.name}</p>
            <p>School: {opinion.scholar.school}</p>

            <h3>Sources</h3>

            {opinion.sources.map((source) => (
              <p key={source.id}>{source.reference}</p>
            ))}
          </div>
        ))}

      </main>

    );

}