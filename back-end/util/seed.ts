import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const defaultDeck = await prisma.cardDeck.upsert({
    where : { id: 0 },
    update: {},
    create: {
      id: 0,
      deckName: "Default Empty Deck",
      }
    });
}  
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
});