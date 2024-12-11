import {
    WhiteCard as WhiteCardPrisma,
    Player as PlayerPrisma,
    PlayerInRound as PlayerInRoundPrisma,
    Round as RoundPrisma
} from '@prisma/client';
import { PlayerInRound } from './playerInRound';

export class WhiteCard {
    private id?: number;
    private playerInRounds: PlayerInRound[];
    private text: string;

    constructor(whiteCard: {
        id?: number;
        playerInRounds: PlayerInRound[];
        text: string;
    }) {
        this.id = whiteCard.id;
        this.playerInRounds = whiteCard.playerInRounds;
        this.text = whiteCard.text;
    }

    getId(): number | undefined {
        return this.id;
    }

    getPlayerInRounds(): PlayerInRound[] {
        return this.playerInRounds;
    }

    getText(): string {
        return this.text;
    }

    static from({
        id,
        playerInRounds,
        text
    }: WhiteCardPrisma & {
        playerInRounds: Array<PlayerInRoundPrisma & {
            player: PlayerPrisma;
            round: RoundPrisma;
            whiteCard: WhiteCardPrisma;
        }>;
    }) {
        return new WhiteCard({
            id,
            playerInRounds: playerInRounds.map((playersInRound) => PlayerInRound.from(playersInRound)),
            text
        });
    }
}