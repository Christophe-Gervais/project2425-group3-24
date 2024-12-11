type GameInput = {
    gameCode: string,
    hostPlayer: PlayerInput,
    cardDeck: CardDeckInput,
    players: PlayerInput[],
    rounds: RoundInput[],
    timeLimit: number,
    maxPlayers: number,
    winCondition: number
}

type PlayerInput = {
    id?: number,
    game: GameInput,
    hostGame: GameInput,
    rounds: PlayerInRoundInput[],
    cardCzarRounds: RoundInput[],
    winningRounds: RoundInput[],
    username: string,
    score: number
}

type PlayerInRoundInput = {
    player: PlayerInput,
    round: RoundInput,
    whiteCard: WhiteCardInput
}

type RoundInput = {
    id?: number,
    game: GameInput,
    cardCzar: PlayerInput,
    winner: PlayerInput,
    blackCard: BlackCardInput,
    players: PlayerInput[],
    roundNumber: number
}

type WhiteCardInput = {
    id?: number,
    playersInRounds: PlayerInRoundInput,
    text: string
}

type BlackCardInput = {
    id?: number,
    rounds: RoundInput[],
    text: string
}

type CardInDeckInput = {
    blackCard: BlackCardInput,
    cardDeck: CardDeckInput
}

type CardDeckInput = {
    id?: number,
    games: GameInput[],
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

