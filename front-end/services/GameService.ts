const createGame = (hostPlayerId: number) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/game/create", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ hostPlayerId: hostPlayerId })
  });
};

const GameService = { createGame };

export default GameService;
