import { 
    Game as GamePrisma,
    Player as PlayerPrisma,
    Round as RoundPrisma,
    CardDeck as CardDeckPrisma,
    CardInDeck as CardInDeckPrisma
} from '@prisma/client';
import { CardDeck } from './cardDeck';

export class Game {
    private gameCode: string;
    private hostPlayerId: number;
    private cardDeck: CardDeck;
    private playerIds: number[];
    private roundIds: number[];
    private timeLimit: number;
    private maxPlayers: number;
    private winCondition: number;

    constructor(game: {
        gameCode?: string;
        hostPlayerId: number;
        cardDeck: CardDeck;
        playerIds: number[];
        roundIds: number[];
        timeLimit: number;
        maxPlayers: number;
        winCondition: number;
    }) {
        this.gameCode = game.gameCode || this.getGameCode();
        this.hostPlayerId = game.hostPlayerId;
        this.cardDeck = game.cardDeck;
        this.playerIds = game.playerIds;
        this.roundIds = game.roundIds;
        this.timeLimit = game.timeLimit;
        this.maxPlayers = game.maxPlayers;
        this.winCondition = game.winCondition;
    }

    getGameCode(): string {
        return this.gameCode;
    }

    getHostPlayerId(): number {
        return this.hostPlayerId;
    }

    getCardDeck(): CardDeck {
        return this.cardDeck;
    }

    getPlayerIds(): number[] {
        return this.playerIds;
    }

    getRoundIds(): number[] {
        return this.roundIds;
    }

    getTimeLimit(): number {
        return this.timeLimit;
    }

    getMaxPlayers(): number {
        return this.maxPlayers;
    }

    getWinCondition(): number {
        return this.winCondition;
    }

    addPlayer(playerId: number): void {
        if (this.playerIds.length < this.maxPlayers) {
            this.playerIds.push(playerId);
        } else {
            throw new Error("Maximum number of players reached");
        }
    }

    static from({
        gameCode,
        hostPlayerId,
        cardDeck,
        players,
        rounds,
        timeLimit,
        maxPlayers,
        winCondition
    }: GamePrisma & {
        cardDeck: CardDeckPrisma & {
            cards: CardInDeckPrisma[];
        };
        players: PlayerPrisma[];
        rounds: RoundPrisma[];
    }) {
        return new Game({
            gameCode,
            hostPlayerId,
            cardDeck: CardDeck.from(cardDeck),
            playerIds: players.map((player) => player.id),
            roundIds: rounds.map((round) => round.id),
            timeLimit,
            maxPlayers,
            winCondition
        });
    }
}