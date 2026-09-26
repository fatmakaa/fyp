import "dotenv/config";
import prisma from "./src/lib/prisma";

async function main() {
  await prisma.evidenceReference.deleteMany();
  await prisma.source.deleteMany();
  await prisma.opinion.deleteMany();
  await prisma.scholar.deleteMany();
  await prisma.topic.deleteMany();
  await prisma.submittedQuestion.deleteMany();

  const topic = await prisma.topic.create({
    data: {
      question: "Sample question",
      category: "Sample category",
    },
  });

  const schools = [
    "Hanafi",
    "Maliki",
    "Shafi'i",
    "Hanbali",
  ];

  for (const school of schools) {
    const scholar = await prisma.scholar.create({
      data: {
        name: `Sample ${school} Scholar`,
        school: school,
        biography: `Sample biography for the ${school} school scholar.`,
      },
    });


    const opinion = await prisma.opinion.create({
      data: {
        ruling: `Sample ${school} ruling`,
        reasoning: `Sample ${school} reasoning`,
        methodologyNote: `Sample ${school} methodology`,
        topicId: topic.id,
        scholarId: scholar.id,
      },
    });

    await prisma.source.create({
      data: {
        reference: `Sample ${school} source`,
        opinionId: opinion.id,
      },
    });

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
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });