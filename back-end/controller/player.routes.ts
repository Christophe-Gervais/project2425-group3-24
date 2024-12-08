import express, { Request, Response } from "express";
import { Player } from "../model/player";
import { PlayerService } from "../service/player.service";

const router = express.Router();
const playerService = new PlayerService();

router.post("/create", (req: Request, res: Response) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ error: "Username is required" });
    }

    const result = playerService.createPlayer(username);

    if (result instanceof Error) {
        return res.status(500).json({ error: result.message });
    }

    return res.status(201).json({ player: result });
});

router.get("/getAllPlayers", (req: Request, res: Response) => {
    try {
        const players = playerService.getPlayers();
        return res.status(200).json({ players });
    } catch (error) {
        return res.status(500).json({ error: "Failed to retrieve players" });
    }
});

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
