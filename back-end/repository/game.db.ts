import { Game } from "../model/game";
import { Player } from "../model/player";

const games: Game[] = [];
const players: Player[] = [];

const getGamesById = ({ id }: { id: string }): Game | null => {
    try {
        return games.find((game) => game.getGameCode() === id) || null;
    } catch (error) {
        console.error(error);
        throw new Error("An error occurred while getting a game by id");
    }
};

const addGame = (game: Game): void => {
    games.push(game);
};

const gameExists = (code: string): boolean => {
    return games.some(game => game.getGameCode() === code);
};

const getAllGames = (): Game[] => {
    return games;
};

const createGame = (game: Game): void => {
    games.push(game);
};

const updateGame = (game: Game): void => {
    const index = games.findIndex(g => g.getGameCode() === game.getGameCode());
    games[index] = game;
}

const addPlayer = (player: Player): void => {
    players.push(player);
}


export default {
    getGamesById,
    addGame,
    gameExists,
    getAllGames,
    createGame,
    updateGame,
    addPlayer
};
