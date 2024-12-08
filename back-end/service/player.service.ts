import { Player } from "../model/player";
import playerDb from "../repository/player.db";


export class PlayerService {

    createPlayer(username: string): Player | Error {
        const newPlayer = new Player({
            username: username,
            score: 0,
            is_host: false
        });
        playerDb.createPlayer(newPlayer); 
        return newPlayer;
    }
    

    getPlayerById(playerId: number): Player | Error {
        const player = playerDb.getPlayersById({ id: playerId });

        if (player === undefined || player === null) {
            return new Error("Player not found");
        }

        return player;
    }

    updatePlayer(player: Player): Player | Error {
        playerDb.updatePlayer(player);
        return player;
    }

    deletePlayer(playerId: number): void {
        playerDb.deletePlayer(playerId);
    }

    getPlayers(): Player[] {
        return playerDb.getAllPlayers();
    }
}
