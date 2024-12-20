import WebSocket from "ws";
import gameDb from "../repository/game.db";
import socketDb from "../repository/socket.db";

const addSocketServer = async (gameCode: string) => {
    const existingGame = await gameDb.getGameByGameCode(gameCode);
    if (!existingGame) {
        throw new Error(`Game with gameCode ${gameCode} does not exist.`);
    }

    await socketDb.addSocketServer(existingGame.getGameCode());
};

const getSocketServerByGameCode = async (gameCode: string): Promise<Set<WebSocket> | undefined> => {
    const existingGame = await gameDb.getGameByGameCode(gameCode);
    if (!existingGame) {
        throw new Error(`Game with gameCode ${gameCode} does not exist.`);
    }

    return await socketDb.getSocketsByGameCode(existingGame.getGameCode());
};

const addSocketToSocketServer = async (gameCode: string, ws: WebSocket) => {
    const existingGame = await gameDb.getGameByGameCode(gameCode);
    if (!existingGame) {
        throw new Error(`Game with gameCode ${gameCode} does not exist.`);
    }

    await socketDb.addSocketToSocketServer(existingGame.getGameCode(), ws);
};

const sendUpdateSignalToSockets = async (gameCode: string) => {
    const existingGame = await gameDb.getGameByGameCode(gameCode);
    if (!existingGame) {
        throw new Error(`Game with gameCode ${gameCode} does not exist.`);
    }

    await socketDb.sendUpdateSignalToSockets(existingGame.getGameCode());
};

export default {
    addSocketServer, 
    getSocketServerByGameCode,
    addSocketToSocketServer,
    sendUpdateSignalToSockets
};