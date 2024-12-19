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
        playerIds?: number[];
        roundIds?: number[];
        timeLimit?: number;
        maxPlayers?: number;
        winCondition?: number;
    }) {
        this.gameCode = game.gameCode || this.generateGameCode();
        this.hostPlayerId = game.hostPlayerId;
        this.cardDeck = game.cardDeck;
        this.playerIds = game.playerIds || [this.hostPlayerId];
        this.roundIds = game.roundIds || [];
        this.timeLimit = game.timeLimit || 60;
        this.maxPlayers = game.maxPlayers || 4;
        this.winCondition = game.winCondition || 3000;
    }

    getGameCode(): string {
        return this.gameCode;
    }

    setHostPlayerId(hostPlayerId: number) {
        this.hostPlayerId = hostPlayerId;
    }

    getHostPlayerId(): number {
        return this.hostPlayerId;
    }

    setCardDeck(cardDeck: CardDeck) {
        this.cardDeck = cardDeck;
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

    generateGameCode(): string {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let gameCode = "";
        for (let i = 0; i < 4; i++) {
            gameCode += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        return gameCode;
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