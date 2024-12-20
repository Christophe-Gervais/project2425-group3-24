const createPlayer = (username: string, gameCode?: string) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/player/create", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ username: username, gameCode: gameCode })
  });
};

const joinGameById = (id: number, gameCode: string) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/player/join", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ id: id, gameCode: gameCode })
  });
};

const deleteById = (id: number) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/player/delete", {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ id: id })
  });
};

const updateUsernameById = (id: number, username: string) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/player/update", {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ id: id, username: username })
  });
};

const addPointsById = (id: number, score: number) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/player/update", {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ id: id, score: score })
  });
};

const getAllPlayersInGameByGameCode = (gameCode: string) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/player/${gameCode}`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
  });
};
  
const PlayerService = {
  createPlayer,
  joinGameById,
  deleteById,
  updateUsernameById,
  addPointsById,
  getAllPlayersInGameByGameCode
};
  
export default PlayerService;