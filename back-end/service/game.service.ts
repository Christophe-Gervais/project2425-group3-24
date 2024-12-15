import { id } from 'date-fns/locale';
import { Game } from '../model/game';
import { CardDeck } from '../model/cardDeck';
import gameDb from '../repository/game.db';
import cardDeckDb from '../repository/cardDeck.db';

export class GameService {
    private readonly maxAttempts = 10;

    async createGame(cardDeckId: number, timeLimit: number, maxPlayers: number, winCondition: number): Promise<Game | Error> {

        const cardDeck = await cardDeckDb.getCardDeckById(cardDeckId);
        if (!cardDeck) {
            return new Error("Card deck not found");
        }

        let attempts = 0;

        while (attempts < this.maxAttempts) {
            const code = this.generateGameCode();

            if (!gameDb.gameExists(code)) {
                const newGame = new Game({
                    gameCode: code,
                    cardDeck: cardDeck,
                    timeLimit: timeLimit,
                    maxPlayers: maxPlayers,
                    winCondition: winCondition,
                    playerIds: [],
                    roundIds: [],
                    hostPlayerId: 0
                });
                await gameDb.createGame(newGame);
                return newGame;
            }

            attempts++;
        }

        return new Error("Unable to generate a unique game code. Please try again.");
    }

    async joinGame(gameCode: string, playerId: number): Promise<Game | Error> { 
        const game = await gameDb.getGameByGameCode(gameCode);

        if (!game) {
            return new Error("Game not found");
        }

        game.addPlayer(playerId);
        return game;
    }

    generateGameCode(): string {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let gameCode = "";
        for (let i = 0; i < 4; i++) {
            gameCode += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        return gameCode;
    }


}
