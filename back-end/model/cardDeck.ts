import {
    CardDeck as CardDeckPrisma,
    CardInDeck as CardInDeckPrisma
} from '@prisma/client';
import { CardInDeck } from "./cardInDeck";

export class CardDeck {
    private id?: number;
    private cards: CardInDeck[];
    private deckName: string;

    constructor(cardDeck: {
        id?: number;
        cards: CardInDeck[];
        deckName: string;
    }) {
        this.id = cardDeck.id;
        this.cards = cardDeck.cards;
        this.deckName = cardDeck.deckName;
    }

    getId(): number | undefined {
        return this.id;
    }

    getCards(): CardInDeck[] {
        return this.cards;
    }

    getDeckName(): string {
        return this.deckName;
    }

    static from({
        id,
        cards,
        deckName
    }: CardDeckPrisma & {
        cards: CardInDeckPrisma[];
    }) {
        return new CardDeck({
            id,
            cards: cards.map((card) => CardInDeck.from(card)),
            deckName
        });
    }
}