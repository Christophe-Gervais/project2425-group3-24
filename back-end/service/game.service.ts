import { Game } from "../model/game";
import gameDB from "../repository/game.db";
import { GameInput } from "../types";
import cardDeckService from "./cardDeck.service";

const createGame = async ({ hostPlayerId, cardDeckId }: GameInput): Promise<Game> => {
    if (!cardDeckId) {
        cardDeckId = 0;
    }
    
    const cardDeck = await cardDeckService.getCardDeckById(cardDeckId);
    const game = new Game({ hostPlayerId: hostPlayerId, cardDeck: cardDeck });

    return await gameDB.createGame(game);
};

const deleteGameByGameCode = async (gameCode: string) => {
    await gameDB.deleteGameByGameCode(gameCode);

    return;
};

const getGameByGameCode = async (gameCode: string): Promise<Game | null> => {
    let game = await gameDB.getGameByGameCode(gameCode);
    if (!game) {
        //throw new Error(`Game with game code ${gameCode} does not exist.`);
        game = null;
    }    
    return game;
};

export default { 
    createGame,
    deleteGameByGameCode,
    getGameByGameCode
};