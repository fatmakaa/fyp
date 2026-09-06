import "dotenv/config";
import prisma from "./src/lib/prisma";

async function main() {
  //Clear existing development data
  await prisma.evidenceReference.deleteMany();
  await prisma.source.deleteMany();
  await prisma.opinion.deleteMany();
  await prisma.scholar.deleteMany();
  await prisma.topic.deleteMany();
  await prisma.submittedQuestion.deleteMany();

  //Create a topiic
  const topic = await prisma.topic.create({
    data: {
      question: "Sample question",
      category: "Sample category",
    },
  });

  //Create a scholar
  const scholar = await prisma.scholar.create({
    data: {
      name: "Sample Scholar",
      school: "Sample School",
    },
  });

  //Create an opinion connected to the topic and scholar
  const opinion = await prisma.opinion.create({
    data: {
      ruling: "Sample ruling",
      reasoning: "Sample reasoning",
      methodologyNote: "Sample methodology note",
      verificationStatus: "Verified",
      topicId: topic.id,
      scholarId: scholar.id,
    },
  });

  //Create a source connected to the opinion
  const source = await prisma.source.create({
    data: {
      reference: "Sample source reference",
      opinionId: opinion.id,
    },
  });

  console.log("Created topic:", topic);
  console.log("Created scholar:", scholar);
  console.log("Created opinion:", opinion);
  console.log("Created source:", source);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });