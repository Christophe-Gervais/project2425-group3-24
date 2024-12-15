import { PrismaClient, Prisma } from '@prisma/client';
import { CardDeck } from "../model/cardDeck";
import database from './database';


const getCardDeckById = async (cardDeckId: number): Promise<CardDeck | null> => {
    try {
        const cardDeckData = await database.cardDeck.findUnique({
            where: { id: cardDeckId },
            include: { cards: true }, 
        });

        if (!cardDeckData) {
            return null; 
        }

        return CardDeck.from({
            id: cardDeckData.id,
            deckName: cardDeckData.deckName,
            cards: cardDeckData.cards,
        });
    } catch (error) {
        console.error("Error fetching card deck:", error);
        return null; 
    }
};

export default {
    getCardDeckById,
};
