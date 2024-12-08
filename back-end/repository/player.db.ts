import { Player } from "../model/player";

const players: Player[] = [];

const getPlayersById =({ id }: { id: number }): Player | null => {
    try {
        return players.find((player) => player.getId() === id) || null;
    } catch (error) {
        console.error(error);
        throw new Error("An error occurred while getting a player by id");
    }
}

const createPlayer = (player: { username: string; score: number; is_host: boolean }): Player => {
    const newPlayer = new Player(player);
    players.push(newPlayer);
    return newPlayer;
};


const updatePlayer = (player: Player): void => {
    const index = players.findIndex(p => p.getId() === player.getId());
    players[index] = player;
}

const deletePlayer = (id: number): void => {
    const index = players.findIndex(p => p.getId() === id);
    players.splice(index, 1);
}

const getAllPlayers = (): Player[] => {
    return players;
}

export default {
    getPlayersById,
    createPlayer,
    updatePlayer,
    deletePlayer,
    getAllPlayers
}