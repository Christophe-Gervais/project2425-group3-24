import { Game } from '../model/game';
import database from './database';

const createGame = async (game: Game): Promise<Game> => {
    try {
        const gamePrisma = await database.game.create({
            data: {
                gameCode: game.getGameCode(),
                hostPlayerId: game.getHostPlayerId(),
                cardDeckId: game.getCardDeck().getId()!,
                timeLimit: game.getTimeLimit(),
                maxPlayers: game.getMaxPlayers(),
                winCondition: game.getWinCondition()
            },
            include: {
                cardDeck: {
                    include: { cards: true }
                },
                players: true,
                rounds: true
            }
        });
        return Game.from(gamePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const updateGame = async (game: Game): Promise<Game | null> => {
    try {
        const gamePrisma = await database.game.update({
            where: { gameCode: game.getGameCode() },
            data: {
                gameCode: game.getGameCode(),
                hostPlayerId: game.getHostPlayerId(),
                cardDeckId: game.getCardDeck().getId()!,
                timeLimit: game.getTimeLimit(),
                maxPlayers: game.getMaxPlayers(),
                winCondition: game.getWinCondition()
            },
            include: {
                cardDeck: {
                    include: { cards: true }
                },
                players: true,
                rounds: true
            }
        });
        return gamePrisma ? Game.from(gamePrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getGameByGameCode = async (gameCode: string): Promise<Game | null> => {
    try {
        const gamePrisma = await database.game.findUnique({
            where: { gameCode },
            include: {
                cardDeck: {
                    include: {
                        cards: true
                    }
                },
                players: true,
                rounds: true
            } 
        });

        return gamePrisma ? Game.from(gamePrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const gameExists = async (gameCode: string): Promise<boolean> => {
    const game = await database.game.findUnique({
        where: { gameCode },
    });
    return game !== null;
};

const getAllGames = async (): Promise<Game[]> => {
    try {
        const gamesPrisma = await database.game.findMany({
            include: {
                cardDeck: {
                    include: {
                        cards: true
                    }
                },
                players: true,
                rounds: true
            }
        });

        return gamesPrisma.map((game) => Game.from(game));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};


export default {
    createGame,
    updateGame,
    getGameByGameCode,
    gameExists,
    getAllGames
};
