import { createCardDeck, getCardDeckById, getAllCardDecks } from '../repository/cardDeck.db';
import { CardDeck } from '../model/cardDeck';
import database from '../repository/database';

jest.mock('../repository/database', () => ({
    cardDeck: {
        create: jest.fn(),
        findUnique: jest.fn(),
        findMany: jest.fn(),
    },
}));

describe('CardDeck Repository', () => {
    const mockCardDeck = {
        id: 1,
        deckName: 'Test Deck',
        cards: [{ id: 1, cardDeckId: 1, blackCardId: 1, blackCard: { id: 1, text: 'Test Black Card' } }]
    };

    const cardDeckInstance = CardDeck.from(mockCardDeck);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createCardDeck', () => {
        it('should create a new card deck', async () => {
            (database.cardDeck.create as jest.Mock).mockResolvedValue(mockCardDeck);

            const result = await createCardDeck(cardDeckInstance);

            expect(database.cardDeck.create).toHaveBeenCalledWith({
                data: { deckName: cardDeckInstance.getDeckName() },
                include: { cards: { include: { blackCard: true } } }
            });
            expect(result).toEqual(cardDeckInstance);
        });

        it('should throw an error if database operation fails', async () => {
            (database.cardDeck.create as jest.Mock).mockRejectedValue(new Error('Database error'));

            await expect(createCardDeck(cardDeckInstance)).rejects.toThrow('Database error. See server log for details.');
        });
    });

    describe('getCardDeckById', () => {
        it('should return a card deck by id', async () => {
            (database.cardDeck.findUnique as jest.Mock).mockResolvedValue(mockCardDeck);

            const result = await getCardDeckById(1);

            expect(database.cardDeck.findUnique).toHaveBeenCalledWith({
                where: { id: 1 },
                include: { cards: { include: { blackCard: true } } }
            });
            expect(result).toEqual(cardDeckInstance);
        });

        it('should return null if card deck is not found', async () => {
            (database.cardDeck.findUnique as jest.Mock).mockResolvedValue(null);

            const result = await getCardDeckById(1);

            expect(result).toBeNull();
        });

        it('should throw an error if database operation fails', async () => {
            (database.cardDeck.findUnique as jest.Mock).mockRejectedValue(new Error('Database error'));

            await expect(getCardDeckById(1)).rejects.toThrow('Database error. See server log for details.');
        });
    });

    describe('getAllCardDecks', () => {
        it('should return all card decks', async () => {
            (database.cardDeck.findMany as jest.Mock).mockResolvedValue([mockCardDeck]);

            const result = await getAllCardDecks();

            expect(database.cardDeck.findMany).toHaveBeenCalledWith({
                include: { cards: { include: { blackCard: true } } }
            });
            expect(result).toEqual([cardDeckInstance]);
        });

        it('should throw an error if database operation fails', async () => {
            (database.cardDeck.findMany as jest.Mock).mockRejectedValue(new Error('Database error'));

            await expect(getAllCardDecks()).rejects.toThrow('Database error. See server log for details.');
        });
    });
});