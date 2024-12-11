import {
    Player as PlayerPrisma,
    PlayerInRound as PlayerInRoundPrisma,
    Round as RoundPrisma
} from '@prisma/client';
import { PlayerInRound } from './playerInRound';

export class Player {
    private id?: number;
    private gameCode: string;
    private rounds: PlayerInRound[];
    private cardCzarRoundIds: number[];
    private winningRoundIds: number[];
    private username: string;
    private score: number;

    constructor(player: {
        id?: number;
        gameCode: string;
        rounds: PlayerInRound[];
        cardCzarRoundIds: number[];
        winningRoundIds: number[];
        username: string;
        score: number;
    }) {
        this.id = player.id;
        this.gameCode = player.gameCode;
        this.rounds = player.rounds;
        this.cardCzarRoundIds = player.cardCzarRoundIds;
        this.winningRoundIds = player.winningRoundIds;
        this.username = player.username;
        this.score = player.score;
    }

    getId(): number | undefined {
        return this.id;
    }

    getGameCode(): string {
        return this.gameCode;
    }

    getRounds(): PlayerInRound[] {
        return this.rounds;
    }

    getCardCzarRoundIds(): number[] {
        return this.cardCzarRoundIds;
    }

    getWinningRoundIds(): number[] {
        return this.winningRoundIds;
    }

    getUsername(): string {
        return this.username;
    }

    getScore(): number {
        return this.score;
    }

    static from({
        id,
        gameCode,
        rounds,
        cardCzarRounds,
        winningRounds,
        username,
        score
    }: PlayerPrisma & {
        rounds: PlayerInRoundPrisma[];
        cardCzarRounds: RoundPrisma[];
        winningRounds: RoundPrisma[];
    }) {
        return new Player({
            id,
            gameCode,
            rounds: rounds.map((round) => PlayerInRound.from(round)),
            cardCzarRoundIds: cardCzarRounds.map((cardCzarRound) => cardCzarRound.id),
            winningRoundIds: winningRounds.map((winningRound) => winningRound.id),
            username,
            score
        });
    }
}