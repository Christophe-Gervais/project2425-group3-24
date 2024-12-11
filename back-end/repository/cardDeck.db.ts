import { CardDeck } from "../model/cardDeck";

const getCardDeckById =({ id }: { id: number }): Card_Deck | null => {
    try {
        return card_decks.find((card_deck) => card_deck.getCardDeckId() === id) || null;
    } catch (error) {
        console.error(error);
        throw new Error("An error occurred while getting a card deck by id");
    }
}

export default {
    getCardDeckById,
}