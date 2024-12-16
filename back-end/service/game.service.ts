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

export default { createGame };