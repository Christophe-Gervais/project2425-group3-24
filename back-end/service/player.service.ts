import { Player } from "../model/player";
import gameDb from "../repository/game.db";
import playerDb from "../repository/player.db";
import { PlayerInput } from "../types";
import gameService from "./game.service";

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

    return await playerDb.updatePlayerById(player!);
};

const updatePlayerById = async ({ id, username }: PlayerInput): Promise<Player | null> => {
    const player = await playerDb.getPlayerById({ id: id! });
    player!.setUsername(username);

    return await playerDb.updatePlayerById(player!);
};

const deletePlayerById = async ({ id }: PlayerInput) => {
    const player = await playerDb.getPlayerById({ id: id! });
    const game = await gameDb.getGameByGameCode(player?.getGameCode()!);

    if (game?.getHostPlayerId() === id) {
        if (game?.getPlayerIds().length === 1) {
            player?.setGameCode(undefined);
            await playerDb.updatePlayerById(player!);
            await gameService.deleteGameByGameCode(game.getGameCode());
        } else {
            game?.setHostPlayerId(game.getPlayerIds().find(playerId => playerId !== id)!);
            await gameDb.updateGame(game!);
        }
    }

    await playerDb.deletePlayerById({ id: id! });

    return;
};

const getAllPlayersInGameByGameCode = async (gameCode: string): Promise<Array<Player> | null> => {
    const existingGame = await gameDb.getGameByGameCode(gameCode);
    if (!existingGame) {
        throw new Error(`Game with gameCode ${gameCode} does not exist.`);
    }
    console.log(gameCode);
    const players = await playerDb.getAllPlayersInGameByGameCode({ gameCode: gameCode });

    return players;
};

export default {
    createPlayer, 
    joinGameById, 
    updatePlayerById,
    deletePlayerById,
    getAllPlayersInGameByGameCode 
};