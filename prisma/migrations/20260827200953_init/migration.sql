-- CreateTable
CREATE TABLE "Topic" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Opinion" (
    "id" SERIAL NOT NULL,
    "topicId" INTEGER NOT NULL,
    "school" TEXT NOT NULL,
    "ruling" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "source" TEXT NOT NULL,

    CONSTRAINT "Opinion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Opinion" ADD CONSTRAINT "Opinion_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
