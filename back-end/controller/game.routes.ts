import { GameService } from "../service/game.service";
import express, { Request, Response } from "express";
import gameRepository from "../repository/game.db";

const router = express.Router();
const gameService = new GameService();

/**
 * @swagger
 * tags:
 *   - name: Game
 *     description: Operations related to game management
 */

/**
 * @swagger
 * /api/games/create:
 *   post:
 *     summary: Create a new game
 *     description: Create a new game by providing card deck ID, time limit, max players, and win condition.
 *     tags: [Game]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               card_deck_id:
 *                 type: integer
 *               time_limit:
 *                 type: integer
 *               max_players:
 *                 type: integer
 *               win_condition:
 *                 type: string
 *     responses:
 *       201:
 *         description: Game created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */
router.post("/create", (req: Request, res: Response) => {
    const { card_deck_id, time_limit, max_players, win_condition } = req.body;

    if (
        card_deck_id === undefined ||
        time_limit === undefined ||
        max_players === undefined ||
        win_condition === undefined
    ) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const result = gameService.createGame(card_deck_id, time_limit, max_players, win_condition);

    if (result instanceof Error) {
        return res.status(500).json({ error: result.message });
    }

    return res.status(201).json({ game: result });
});

/**
 * @swagger
 * /api/games/getAllGames:
 *   get:
 *     summary: Get all games
 *     description: Retrieve a list of all games.
 *     tags: [Game]
 *     responses:
 *       200:
 *         description: List of games
 *       500:
 *         description: Internal server error
 */
router.get("/getAllGames", (req: Request, res: Response) => {
    try {
        const games = gameRepository.getAllGames();
        return res.status(200).json({ games });
    } catch (error) {
        return res.status(500).json({ error: "Failed to retrieve games" });
    }
});

/**
 * @swagger
 * /api/games/join:
 *   put:
 *     summary: Join a game
 *     description: Join an existing game by providing the game ID and player ID.
 *     tags: [Game]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               game_id:
 *                 type: integer
 *               player_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Successfully joined the game
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */
router.put("/join", (req: Request, res: Response) => {
    const { game_id, player_id } = req.body;

    if (game_id === undefined || player_id === undefined) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const result = gameService.joinGame(game_id, player_id);

    if (result instanceof Error) {
        return res.status(500).json({ error: result.message });
    }

    return res.status(200).json({ game: result });
});

export default router;
