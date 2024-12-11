import {
    BlackCard as BlackCardPrisma,
    CardInDeck as CardInDeckPrisma,
    Round as RoundPrisma
} from '@prisma/client';
import { CardInDeck } from './cardInDeck';

export class BlackCard {
    private id?: number;
    private roundIds: number[];
    private decks: CardInDeck[];
    private text: string;

    constructor(blackCard: {
        id?: number;
        roundIds: number[],
        decks: CardInDeck[],
        text: string;
    }) {
        this.id = blackCard.id;
        this.roundIds = blackCard.roundIds;
        this.decks = blackCard.decks;
        this.text = blackCard.text;
    }

    getId(): number | undefined {
        return this.id;
    }

    getRoundIds(): number[] {
        return this.roundIds;
    }

    getDecks(): CardInDeck[] {
        return this.decks;
    }

    getText(): string {
        return this.text;
    }

    static from({
        id,
        rounds,
        decks,
        text
    }: BlackCardPrisma & {
        rounds: RoundPrisma[];
        decks: CardInDeckPrisma[];
    }) {
        return new BlackCard({
            id, 
            roundIds: rounds.map((round) => round.id),
            decks: decks.map((deck) => CardInDeck.from(deck)),
            text
        });
    }
}