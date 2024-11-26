import { Player } from "../model/player";

const players = [
    new Player({
        id: 1,
        username: "player1",
        score: 0,
        is_host: true
    }),
]

const getPlayersById =({ id }: { id: number }): Player | null => {
    try {
        return players.find((player) => player.getId() === id) || null;
    } catch (error) {
        console.error(error);
        throw new Error("An error occurred while getting a player by id");
    }
}

const createPlayer = (player: Player): void => {
    players.push(player);
}

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