import { Player } from "../model/player";
import gameDb from "../repository/game.db";
import playerDb from "../repository/player.db";
import { PlayerInput } from "../types";

const createPlayer = async ({ username, gameCode }: PlayerInput): Promise<Player> => {
    if (gameCode) {
        const existingGame = await gameDb.getGameByGameCode(gameCode);
        if (!existingGame) {
            throw new Error(`Game with gameCode ${gameCode} does not exist.`);
        }
    }

    const player = new Player({ username: username, gameCode: gameCode, score: 0 });

    return await playerDb.createPlayer(player);
};

const joinGameById = async ({ id, gameCode }: PlayerInput): Promise<Player | null> => {
    const existingGame = await gameDb.getGameByGameCode(gameCode);
    if (!existingGame) {
        throw new Error(`Game with gameCode ${gameCode} does not exist.`);
    }

    const player = await playerDb.getPlayerById({ id: id! });
    player!.setGameCode(gameCode);

    return await playerDb.updatePlayer(player!);
};

export default { createPlayer, joinGameById };