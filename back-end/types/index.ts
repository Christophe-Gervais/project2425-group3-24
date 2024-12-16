type GameInput = {
    gameCode: string,
    hostPlayerId: number,
    cardDeckId: number,
    playerIds: number[],
    roundIds: number[],
    timeLimit: number,
    maxPlayers: number,
    winCondition: number
}

type PlayerInput = {
    id?: number,
    gameCode: string,
    hostGameCode: string,
    rounds: PlayerInRoundInput[],
    cardCzarRoundIds: number[],
    winningRoundIds: number[],
    username: string,
    score: number
}

type PlayerInRoundInput = {
    playerId: number,
    roundId: number,
    whiteCardId: number
}

type RoundInput = {
    id?: number,
    gameCode: number,
    cardCzarId: number,
    winnerId: number,
    blackCard: BlackCardInput,
    players: PlayerInRoundInput[],
    roundNumber: number
}

type WhiteCardInput = {
    id?: number,
    playerInRounds: PlayerInRoundInput[],
    text: string
}

type BlackCardInput = {
    id?: number,
    roundIds: number[],
    decks: CardInDeckInput[],
    text: string
}

type CardInDeckInput = {
    blackCardId: number,
    cardDeckId: number
}

type CardDeckInput = {
    id?: number,
    cards: CardInDeckInput[],
    deckName: string
}

export {
    GameInput,
    PlayerInput,
    PlayerInRoundInput,
    RoundInput,
    WhiteCardInput,
    BlackCardInput,
    CardInDeckInput,
    CardDeckInput
}

