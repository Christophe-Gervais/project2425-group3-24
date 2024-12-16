import { CardDeck } from "../model/cardDeck";
import cardDeckDb from "../repository/cardDeck.db";

const getCardDeckById = async (id: number): Promise<CardDeck> => {
    const cardDeck = await cardDeckDb.getCardDeckById(id);
    if (!cardDeck) throw new Error(`Card deck with id ${id} does not exist.`);
    return cardDeck;
};

export default { getCardDeckById };