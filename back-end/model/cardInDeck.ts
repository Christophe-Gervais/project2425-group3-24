import { CardInDeck as CardInDeckPrisma } from '@prisma/client';

export class CardInDeck {
    private blackCardId: number;
    private cardDeckId: number;

    constructor(cardInDeck: {
        blackCardId: number;
        cardDeckId: number
    }) {
        this.blackCardId = cardInDeck.blackCardId;
        this.cardDeckId = cardInDeck.cardDeckId;
    }

    getBlackCardId(): number {
        return this.blackCardId;
    }

    getCardDeckId(): number {
        return this.cardDeckId;
    }

    static from({
        blackCardId,
        cardDeckId
    }: CardInDeckPrisma) {
        return new CardInDeck({
            blackCardId,
            cardDeckId
        });
    }
}