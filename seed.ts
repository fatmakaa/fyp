import "dotenv/config";
import prisma from "./src/lib/prisma";

async function main() {
  // Clear existing development data
  await prisma.evidenceReference.deleteMany();
  await prisma.source.deleteMany();
  await prisma.opinion.deleteMany();
  await prisma.scholar.deleteMany();
  await prisma.topic.deleteMany();
  await prisma.submittedQuestion.deleteMany();

  // Create one topic
  const topic = await prisma.topic.create({
    data: {
      question: "Sample question",
      category: "Sample category",
    },
  });

  // Four schools of thought
  const schools = [
    "Hanafi",
    "Maliki",
    "Shafi'i",
    "Hanbali",
  ];

  for (const school of schools) {
    // Create a scholar for this school
    const scholar = await prisma.scholar.create({
      data: {
        name: `Sample ${school} Scholar`,
        school: school,
      },
    });

    // Create an opinion connected to the topic and scholar
    const opinion = await prisma.opinion.create({
      data: {
        ruling: `Sample ${school} ruling`,
        reasoning: `Sample ${school} reasoning`,
        methodologyNote: `Sample ${school} methodology`,
        verificationStatus: "Verified",
        topicId: topic.id,
        scholarId: scholar.id,
      },
    });

    // Create a source for the opinion
    await prisma.source.create({
      data: {
        reference: `Sample ${school} source`,
        opinionId: opinion.id,
      },
    });

    // Create an evidence reference for the opinion
    await prisma.evidenceReference.create({
      data: {
        type: "Sample type",
        title: `Sample ${school} evidence`,
        description: `Sample ${school} evidence description`,
        url: "https://example.com",
        opinionId: opinion.id,
      },
    });
  }

  console.log("Development database seeded successfully.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });