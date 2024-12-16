import { CardDeck } from '../model/cardDeck';
import database from './database';

const createCardDeck = async (cardDeck: CardDeck): Promise<CardDeck> => {
    try {
        const cardDeckPrisma = await database.cardDeck.create({
            data: {
                deckName: cardDeck.getDeckName()
            },
            include: {
                cards: {
                    include: {  blackCard: true }
                }
            }
        });
        return CardDeck.from(cardDeckPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getCardDeckById = async (id: number): Promise<CardDeck | null> => {
    try {
        const cardDeckPrisma = await database.cardDeck.findUnique({
            where: { id },
            include: {
                cards: {
                    include: {  blackCard: true }
                }
            }
        });

        return cardDeckPrisma ? CardDeck.from(cardDeckPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getAllCardDecks = async (): Promise<CardDeck[]> => {
    try {
        const cardDeckPrisma = await database.cardDeck.findMany({
            include: {
                cards: {
                    include: {  blackCard: true }
                }
            }
        });

        return cardDeckPrisma.map((cardDeck) => CardDeck.from(cardDeck));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    createCardDeck,
    getCardDeckById,
    getAllCardDecks
};
