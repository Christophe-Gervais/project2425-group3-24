import { Player } from "../model/player";
import playerDb from "../repository/player.db";

export class PlayerService {
    // Create a new player
    async createPlayer(username: string, gameCode: string): Promise<Player> {
        try {
            // Create a new Player instance
            const newPlayer = new Player({
                username: username,
                gameCode: gameCode,
                score: 0,  // default score can be 0
                rounds: [],  // Initialize with an empty rounds array
                cardCzarRoundIds: [],  // Initialize with empty array
                winningRoundIds: []  // Initialize with empty array
            });
            
            // Persist the player to the database
            return await playerDb.createPlayer(newPlayer);
        } catch (error) {
            console.error(error);
            throw new Error('Error creating player.');
        }
    }

    // Get a player by ID
    async getPlayerById(playerId: number): Promise<Player | null> {
        try {
            const player = await playerDb.getPlayerById({ id: playerId });
            if (!player) {
                throw new Error('Player not found');
            }
            return player;
        } catch (error) {
            console.error(error);
            throw new Error('Error fetching player.');
        }
    }

    // Update an existing player
    async updatePlayer(player: Player): Promise<Player | null> {
        try {
            const updatedPlayer = await playerDb.updatePlayer(player);
            return updatedPlayer;
        } catch (error) {
            console.error(error);
            throw new Error('Error updating player.');
        }
    }

    // Delete a player by ID
    async deletePlayer(playerId: number): Promise<void> {
        try {
            await playerDb.deletePlayer(playerId);
        } catch (error) {
            console.error(error);
            throw new Error('Error deleting player.');
        }
    }

    // Get all players (with associated data)
    async getAllPlayers(): Promise<Player[]> {
        try {
            return await playerDb.getAllPlayers();
        } catch (error) {
            console.error(error);
            throw new Error('Error fetching players.');
        }
    }
}
