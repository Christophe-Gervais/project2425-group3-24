import {
    Round as RoundPrisma,
    PlayerInRound as PlayerInRoundPrisma,
    CardInDeck as CardInDeckPrisma,
    BlackCard as BlackCardPrisma
} from '@prisma/client';
import { BlackCard } from "./blackCard";
import { PlayerInRound } from "./playerInRound";

export class Round {
    private id?: number;
    private gameCode: string;
    private cardCzarId: number;
    private winnerId: number;
    private blackCard: BlackCard;
    private players: PlayerInRound[];
    private roundNumber: number;

    constructor(round: {
        id?: number;
        gameCode: string;
        cardCzarId: number;
        winnerId: number;
        blackCard: BlackCard;
        players: PlayerInRound[];
        roundNumber: number;
    }) {
        this.id = round.id;
        this.gameCode = round.gameCode;
        this.cardCzarId = round.cardCzarId;
        this.winnerId = round.winnerId;
        this.blackCard = round.blackCard;
        this.players = round.players;
        this.roundNumber = round.roundNumber;
    }

    getId(): number | undefined {
        return this.id;
    }

    getGameCode(): string {
        return this.gameCode;
    }

    getCardCzarId(): number {
        return this.cardCzarId;
    }

    getWinnerId(): number {
        return this.winnerId;
    }

    getBlackCard(): BlackCard {
        return this.blackCard;
    }

    getPlayers(): PlayerInRound[] {
        return this.players;
    }

    getRoundNumber(): number {
        return this.roundNumber;
    }

    static from({
        id,
        gameCode,
        cardCzarId,
        winnerId,
        blackCard,
        players,
        roundNumber
    }: RoundPrisma & {
        blackCard: BlackCardPrisma & {
            rounds: RoundPrisma[];
            decks: CardInDeckPrisma[];
        };
        players: PlayerInRoundPrisma[];
    }) {
        return new Round({
            id,
            gameCode,
            cardCzarId,
            winnerId,
            blackCard: BlackCard.from(blackCard),
            players: players.map((player) => PlayerInRound.from(player)),
            roundNumber
        });
    }
}