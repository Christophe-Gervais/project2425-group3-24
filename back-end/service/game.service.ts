import { id } from 'date-fns/locale';
import { Game } from '../model/game';
import gameDb from '../repository/game.db';

export class GameService {
    private readonly maxAttempts = 10;

    createGame(cardDeckId: number, timeLimit: number, maxPlayers: number, winCondition: number): Game | Error {
        let attempts = 0;

        while (attempts < this.maxAttempts) {
            const code = this.generateCode();

            if (!gameDb.gameExists(code)) {
                const newGame = new Game({
                    game_code: code,
                    card_deck_id: cardDeckId,
                    time_limit: timeLimit,
                    max_players: maxPlayers,
                    win_condition: winCondition
                });
                gameDb.addGame(newGame);
                return newGame;
            }

            attempts++;
        }

        return new Error("Unable to generate a unique game code. Please try again.");
    }

    joinGame(gameCode: string, playerId: number): Game | Error {
        const game = gameDb.getGamesById({ id: gameCode });

        if (game === undefined || game === null) {
            return new Error("Game not found");
        }

        game.addPlayer(playerId);
        return game;
    }

    
}
