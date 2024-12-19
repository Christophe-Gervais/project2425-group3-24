type Game = {
  gameCode: string,
  hostPlayerId: number,
  cardDeckId: number,
  playerIds: number[],
  roundIds: number[],
  timeLimit: number,
  maxPlayers: number,
  winCondition: number
}

type Player = {
  id?: number,
  gameCode: string,
  hostGameCode: string,
  rounds: PlayerInRound[],
  cardCzarRoundIds: number[],
  winningRoundIds: number[],
  username: string,
  score: number
}

type PlayerInRound = {
  playerId: number,
  roundId: number,
  whiteCardId: number
}

type Round = {
  id?: number,
  gameCode: number,
  cardCzarId: number,
  winnerId: number,
  blackCard: BlackCard,
  players: PlayerInRound[],
  roundNumber: number
}

type WhiteCard = {
  id?: number,
  playerInRounds: PlayerInRound[],
  text: string
}

type BlackCard = {
  id?: number,
  roundIds: number[],
  decks: CardInDeck[],
  text: string
}

type CardInDeck = {
  blackCardId: number,
  cardDeckId: number
}

type CardDeck = {
  id?: number,
  cards: CardInDeck[],
  deckName: string
}

export type {
  Game,
  Player,
  PlayerInRound,
  Round,
  WhiteCard,
  BlackCard,
  CardInDeck,
  CardDeck
}

