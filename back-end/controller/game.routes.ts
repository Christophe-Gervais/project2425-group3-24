import express, { NextFunction, Request, Response } from "express";
import { GameInput } from "../types";
import gameService from "../service/game.service";

const gameRouter = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Game
 *     description: Operations related to game management
 */

/**
 * @swagger
 * /api/game/create:
 *   post:
 *     summary: Create a new game
 *     description: Create a new game by providing a host player ID.
 *     tags: [Game]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hostPlayerId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Game created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */
gameRouter.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const gameInput = <GameInput>req.body;
        const game = await gameService.createGame(gameInput);
        res.status(200).json(game);
    } catch (error) {
        next(error);
    }
});

export { gameRouter };