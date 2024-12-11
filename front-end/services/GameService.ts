const createGame = async () => {
  return await fetch(process.env.NEXT_PUBLIC_API_URL + "/games/create", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
      card_deck_id: 1,
      time_limit: 60,
      max_players: 10,
      win_condition: 500
    })
  });
};

const GameService = {
  createGame
};

export default GameService;
