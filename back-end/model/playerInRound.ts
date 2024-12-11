import { PlayerInRound as PlayerInRoundPrisma } from '@prisma/client';

export class PlayerInRound {
    private playerId: number;
    private roundId: number;
    private whiteCardId: number;

    constructor(PlayerInRound: {
        playerId: number;
        roundId: number;
        whiteCardId: number;
    }) {
        this.playerId = PlayerInRound.playerId;
        this.roundId = PlayerInRound.roundId;
        this.whiteCardId = PlayerInRound.whiteCardId;
    }

    getPlayerId(): number {
        return this.playerId;
    }

    getRoundId(): number {
        return this.roundId;
    }

    getWhiteCardId(): number {
        return this.whiteCardId;
    }

    static from({
        playerId,
        roundId,
        whiteCardId
    }: PlayerInRoundPrisma) {
        return new PlayerInRound({
            playerId,
            roundId,
            whiteCardId
        });
    }
}