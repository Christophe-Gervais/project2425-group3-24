import { Player } from "../model/player";
import gameDb from "../repository/game.db";
import playerDb from "../repository/player.db";
import { PlayerInput } from "../types";
import gameService from "./game.service";
import socketService from "./socket.service";

const createPlayer = async ({ username, gameCode }: PlayerInput): Promise<Player> => {
    if (gameCode) {
        const existingGame = await gameDb.getGameByGameCode(gameCode);
        if (!existingGame) {
            throw new Error(`Game with gameCode ${gameCode} does not exist.`);
        }
        await socketService.sendUpdateSignalToSockets(gameCode);
    }

    const player = new Player({ username: username!, gameCode: gameCode, score: 0 });

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

const updatePlayerById = async ({ id, username, score }: PlayerInput): Promise<Player | null> => {
    const player = await playerDb.getPlayerById({ id: id! });
    player!.setUsername(username!);
    player!.addScore(score?score:0);
    await socketService.sendUpdateSignalToSockets(player?.getGameCode()!);
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
            await socketService.sendUpdateSignalToSockets(game?.getGameCode()!);
        }
    } else await socketService.sendUpdateSignalToSockets(game?.getGameCode()!);

    await playerDb.deletePlayerById({ id: id! });

    return;
};

const getAllPlayersInGameByGameCode = async (gameCode: string): Promise<Array<Player> | null> => {
    const existingGame = await gameDb.getGameByGameCode(gameCode);
    if (!existingGame) {
        throw new Error(`Game with gameCode ${gameCode} does not exist.`);
    }

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