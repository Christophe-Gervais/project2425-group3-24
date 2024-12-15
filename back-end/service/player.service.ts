import { Player } from "../model/player";
import playerDb from "../repository/player.db";

export class PlayerService {
    async createPlayer(username: string, gameCode: string): Promise<Player> {
        try {
            const newPlayer = new Player({
                username: username,
                gameCode: gameCode,
                score: 0,  
                rounds: [], 
                cardCzarRoundIds: [],  
                winningRoundIds: [] 
            });
            
            return await playerDb.createPlayer(newPlayer);
        } catch (error) {
            console.error(error);
            throw new Error('Error creating player.');
        }
    }

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

    async updatePlayer(player: Player): Promise<Player | null> {
        try {
            const updatedPlayer = await playerDb.updatePlayer(player);
            return updatedPlayer;
        } catch (error) {
            console.error(error);
            throw new Error('Error updating player.');
        }
    }

    async deletePlayer(playerId: number): Promise<void> {
        try {
            await playerDb.deletePlayer(playerId);
        } catch (error) {
            console.error(error);
            throw new Error('Error deleting player.');
        }
    }

    async getAllPlayers(): Promise<Player[]> {
        try {
            return await playerDb.getAllPlayers();
        } catch (error) {
            console.error(error);
            throw new Error('Error fetching players.');
        }
    }
}
