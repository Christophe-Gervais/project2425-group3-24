import express from "express";
import expressWs from "express-ws";
import WebSocket from "ws";
import gameService from "../service/game.service";

const socketRouter = express.Router() as expressWs.Router;
const wssList: Map<string, Set<WebSocket>> = new Map();

const mountSocketRouter = async () => {
    socketRouter.ws("/:gameCode", async (ws, req) => {
        const { gameCode } = req.params;
        let game = await gameService.getGameByGameCode(gameCode);
        if (!game) {
            //throw new Error(`Game with gameCode ${gameCode} does not exist.`);
            game = null;
        }

        if (!wssList.has(gameCode)) {
            wssList.set(gameCode, new Set());
          }
        wssList.get(gameCode)!.add(ws);
        
        ws.on("message", (message) => {
            const clients = wssList.get(gameCode);
            if (clients && message.toString() === "updateSignal") {
                clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send("updateSignal");
                    }
                });
            }
        });
    
        ws.on("close", () => {
            console.log(`WebSocket disconnected for gameCode: ${gameCode}`);
            const clients = wssList.get(gameCode);
            if (clients) {         
                clients.delete(ws);
                if (clients.size === 0) {
                    wssList.delete(gameCode);
                }
            }
        });
    });
}

export { mountSocketRouter, socketRouter };