import express, { NextFunction, Request, Response } from "express";
import { PlayerInput } from "../types";
import playerService from "../service/player.service";

const playerRouter = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Player
 *     description: Operations related to player management
 */

/**
 * @swagger
 * /api/player/create:
 *   post:
 *     summary: Create a new player
 *     description: Create a new player by providing an username and optionally a game code.
 *     tags: [Player]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The name of the player.
 *               gameCode:
 *                 type: string
 *                 description: The game code of the game which the player joins.
 *     responses:
 *       201:
 *         description: Player created successfully
 *       400:
 *         description: Username is required
 *       500:
 *         description: Internal server error
 */
playerRouter.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const playerInput = <PlayerInput>req.body;
        const player = await playerService.createPlayer(playerInput);
        res.status(200).json(player);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /api/player/join:
 *   put:
 *     summary: Join a game with an existing player
 *     description: Join a game by providing a player with the game's game code.
 *     tags: [Player]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The player's ID.
 *               gameCode:
 *                 type: string
 *                 description: The game's game code.
 *     responses:
 *       200:
 *         description: Player joined the game successfully
 *       400:
 *         description: player ID and game code are required
 *       500:
 *         description: Internal server error
 */
playerRouter.post('/join', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const playerInput = <PlayerInput>req.body;
        const player = await playerService.joinGameById(playerInput);
        res.status(200).json(player);
    } catch (error) {
        next(error);
    }
});

export { playerRouter };