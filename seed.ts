import "dotenv/config";
import prisma from "./src/lib/prisma";

async function main(){
const topic = await prisma.topic.create({
data: {
 question: "Sample question",
 category: "Sample category",
 },
});

console.log("Created topic: ", topic)

}

main()
.catch(console.error)
.finally(async () => {
await prisma.$disconnect();
});