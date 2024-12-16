const createPlayer = async (username: string, gameCode?: string) => {
  return await fetch(process.env.NEXT_PUBLIC_API_URL + "/player/create", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ username: username, gameCode: gameCode })
  });
};

const joinGameById = async (id: number, gameCode: string) => {
  return await fetch(process.env.NEXT_PUBLIC_API_URL + "/player/join", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ id: id, gameCode: gameCode })
  });
};
  
const PlayerService = {
  createPlayer,
  joinGameById
};
  
export default PlayerService;