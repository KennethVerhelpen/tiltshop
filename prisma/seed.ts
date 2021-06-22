import prisma from "../lib/prisma";
import { types, topics, articles } from '../lib/seeds';

async function generateSeeds() {
  // await prisma.type.createMany({data: types});
  // await prisma.topic.createMany({data: topics});
  // await prisma.article.createMany({data: articles});
}

generateSeeds()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })