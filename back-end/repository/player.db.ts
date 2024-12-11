import { Player } from "../model/player";
import database from './database';

const createPlayer = async (player: Player): Promise<Player> => {
    try {
        const playerPrisma = await database.player.create({
            data: {
                id: player.getId()!,
                gameCode: player.getGameCode(),
                username: player.getUsername(),
                score: player.getScore()
            },
            include: {
                rounds: true,
                cardCzarRounds: true,
                winningRounds: true
            }
        });
        return Player.from(playerPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const updatePlayer = async (player: Player): Promise<Player | null> => {
    try {
        const playerPrisma = await database.player.update({
            where: { id: player.getId() },
            data: {
                id: player.getId(),
                gameCode: player.getGameCode(),
                username: player.getUsername(),
                score: player.getScore()
            },
            include: {
                rounds: true,
                cardCzarRounds: true,
                winningRounds: true
            }
        });
        return playerPrisma ? Player.from(playerPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getPlayerById = async ({ id }: { id: number }): Promise<Player | null> => {
    try {
        const playerPrisma = await database.player.findUnique({
            where: { id },
            include: {
                rounds: true,
                cardCzarRounds: true,
                winningRounds: true
            }
        });

        return playerPrisma ? Player.from(playerPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    createPlayer,
    updatePlayer,
    getPlayerById
}