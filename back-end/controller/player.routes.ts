import express, { Request, Response } from "express";
import { Player } from "../model/player";
import { PlayerService } from "../service/player.service";

const router = express.Router();
const playerService = new PlayerService();

/**
 * @swagger
 * tags:
 *   - name: Player
 *     description: Operations related to player management
 */

/**
 * @swagger
 * /api/players/create:
 *   post:
 *     summary: Create a new player
 *     description: Create a new player by providing a username.
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
 *     responses:
 *       201:
 *         description: Player created successfully
 *       400:
 *         description: Username is required
 *       500:
 *         description: Internal server error
 */
router.post("/create", (req: Request, res: Response) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ error: "Username is required" });
    }

    const result = playerService.createPlayer(username, "gameCode");

    if (result instanceof Error) {
        return res.status(500).json({ error: result.message });
    }

    return res.status(201).json({ player: result });
});

/**
 * @swagger
 * /api/players/getAllPlayers:
 *   get:
 *     summary: Get all players
 *     description: Retrieve a list of all players.
 *     tags: [Player]
 *     responses:
 *       200:
 *         description: List of players
 *       500:
 *         description: Internal server error
 */
router.get("/getAllPlayers", (req: Request, res: Response) => {
    try {
        const players = playerService.getAllPlayers();
        return res.status(200).json({ players });
    } catch (error) {
        return res.status(500).json({ error: "Failed to retrieve players" });
    }
});

/**
 * @swagger
 * /api/players/update:
 *   put:
 *     summary: Update an existing player
 *     description: Update a player's details by providing player ID and username.
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
 *               username:
 *                 type: string
 *                 description: The updated name of the player.
 *     responses:
 *       200:
 *         description: Player updated successfully
 *       400:
 *         description: Player ID and username are required
 *       500:
 *         description: Internal server error
 */
router.put("/update", (req: Request, res: Response) => {
    const playerData = req.body;

    if (!playerData.id || !playerData.username) {
        return res.status(400).json({ error: "Player ID and username are required" });
    }

    const player = new Player(playerData);
    const result = playerService.updatePlayer(player);

    if (result instanceof Error) {
        return res.status(500).json({ error: result.message });
    }

    return res.status(200).json({ player: result });
});

export default router;
