import express from "express";
import expressWs from "express-ws";
import socketService from "../service/socket.service";

const socketRouter = express.Router() as expressWs.Router;

const mountSocketRouter = async () => {
    socketRouter.ws("/:gameCode", async (ws, req) => {
        const gameCode = req.params.gameCode;

        if (!(await socketService.getSocketServerByGameCode(gameCode))) {
            await socketService.addSocketServer(gameCode);
        }
        socketService.addSocketToSocketServer(gameCode, ws);
    });
}

export { mountSocketRouter, socketRouter };