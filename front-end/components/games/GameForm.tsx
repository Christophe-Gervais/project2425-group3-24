import styles from "@styles/Home.module.css";
import PlayerService from "@services/PlayerService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import GameService from "@services/GameService";

const JoinGameForm: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [gameCode, setGameCode] = useState("");
  const [gameCodeError, setGameCodeError] = useState("");

  const createGame = async () => {
    setUsernameError("");
    setGameCodeError("");
    if(username === "") {
      setUsernameError("< Username is required");
      return;
    }
    
    const [createdPlayerResponse] = await Promise.all([
      PlayerService.createPlayer(username)
    ]);
    const [createdPlayer] = await Promise.all([
      createdPlayerResponse.json()
    ]);

    const [createdGameResponse] = await Promise.all([
      GameService.createGame(createdPlayer.id)
    ]);
    const [createdGame] = await Promise.all([
      createdGameResponse.json()
    ]);

    const [updatedPlayerResponse] = await Promise.all([
      PlayerService.joinGameById(createdPlayer.id, createdGame.gameCode)
    ]);
    const [updatedPlayer] = await Promise.all([
      updatedPlayerResponse.json()
    ]);

    router.push("/" + createdGame.gameCode);
  };

  const joinGame = async (event: React.FormEvent) => {
    event.preventDefault();

    setUsernameError("");
    setGameCodeError("");

    let errorsPresent = false;
    if(username === "") {
      setUsernameError("< Username is required");
      errorsPresent = true;
    }
    const gameCodeRegex = /^[A-Z]{4}$/;
    if(!gameCodeRegex.test(gameCode)) {
      setGameCodeError("< Invalid game code. Example format: QTEZ");
      errorsPresent = true;
    }
    if(gameCode === "") {
      setGameCodeError("< Game code is required");
      errorsPresent = true;
    }
    if(errorsPresent) { return; }

    const [createdPlayerResponse] = await Promise.all([
      PlayerService.createPlayer(username, gameCode)
    ]);
    const [createdPlayer] = await Promise.all([
      createdPlayerResponse.json()
    ]);

    router.push("/" + createdPlayer.gameCode);
  };
  return (
    <article className={`${styles.article}`}>
      <h2 className={`${styles.h2}`}>What's your name?</h2>
      <input 
        className={`${styles.lineInput}`}
        type="text" 
        placeholder="Username..." 
        maxLength={20}
        value={username}
        onChange={(event) => setUsername(event.target.value) } />
      <span
        className={`${styles.errorSpan}`}>
        {usernameError}
      </span>
      <h2 className={`${styles.h2}`}>Join a game</h2>
      <form className={`${styles.form}`} onSubmit={joinGame}>
        <input 
          className={`${styles.boxInput}`} 
          type="text" placeholder="Code..." 
          maxLength={4}
          value={gameCode}
          onChange={(event) => setGameCode(event.target.value.toUpperCase())} />
        <button 
          className={`${styles.join}`}
          type="submit">
          Join
        </button>
      </form>
      <span
        className={`${styles.errorSpan}`}>
        {gameCodeError}
      </span>
      <h3 className={`${styles.h3}`}><span className={`${styles.span}`}>or</span></h3>
      <button 
      className={`${styles.create}`}
      onClick={createGame}>
      Create a game
      </button>
    </article>
  );
};

export default JoinGameForm;