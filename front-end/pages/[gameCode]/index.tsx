import styles from "@styles/Game.module.css";
import Head from "next/head";
import Header from "@components/header";
import { useRouter } from "next/router";
import useWebSocket from "react-use-websocket";
import { useEffect, useState } from "react";
import useSWRImmutable from 'swr/immutable'
import PlayerService from "@services/PlayerService";
import PlayerItem from "@components/players/PlayerItem";
import { Player } from "@types";
import RuleItem from "@components/games/RuleItem";
import Overview from "@components/Overview";

const ReadGameByGameCode = () => {
  const router = useRouter();
  const gameCode = router.query.gameCode?.toString();
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const { lastMessage } = useWebSocket(gameCode ? `ws://localhost:3000/api/socket/${gameCode}` : null, {
    shouldReconnect: () => true
  });

  useEffect(() => {
    if (lastMessage?.data === "updateSignal") {
      console.log(lastMessage?.data);
      mutate();
    }
  }, [lastMessage]);

  const fetcher = async () => {
    if (!gameCode) return null; // Prevent fetching if gameCode is not ready
    if (sessionStorage.getItem("playerID") === null) {
      const [createdPlayerResponse] = await Promise.all([
        PlayerService.createPlayer("Unnamed player", gameCode)
      ]);
      const [createdPlayer] = await Promise.all([
        createdPlayerResponse.json()
      ]);
  
      sessionStorage.setItem("playerID", createdPlayer.id);
    }

    const [playersResponse] = await Promise.all([
        PlayerService.getAllPlayersInGameByGameCode(gameCode!)
    ]);

    if (playersResponse.ok) {
        const players: Array<Player> = (await Promise.all([playersResponse.json()]))[0];
        setUsername(players.find(player => player.id === Number(sessionStorage.getItem("playerID")))?.username as string);
        players.sort(function(a, b){return a.id! - b.id!});
        return { players };
    }
  };

  const { data, isLoading, error, mutate } = useSWRImmutable(gameCode ? "players" : null, fetcher);

  if (!router.isReady) {
    return <p>Loading...</p>;
  }

  const changeName = async (event: React.FormEvent) => {
    event.preventDefault();

    setUsernameError("");

    if(username === "") {
      setUsernameError("< Username is required");
      return;
    }

    const [updatedPlayerResponse] = await Promise.all([
      PlayerService.updateUsernameById(Number(sessionStorage.getItem("playerID")), username)
    ]);
    const [updatedPlayer] = await Promise.all([
      updatedPlayerResponse.json()
    ]);
  }

  const freePoints = async () => {
    const [updatedPlayerResponse] = await Promise.all([
      PlayerService.addPointsById(Number(sessionStorage.getItem("playerID")), 100)
    ]);
    const [updatedPlayer] = await Promise.all([
      updatedPlayerResponse.json()
    ]);
  }
  return (
    <>
      <Head>
        <title>Lobby {gameCode}</title>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Kanit&family=Open+Sans&display=swap" rel="stylesheet" />

        <meta name="description" content="By Arne and Christophe" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header 
        gameCode={gameCode!} />
      <main className={`${styles.main}`}>
        <div>
          {error && <p className="text-danger">Failed to load</p>}
          {isLoading && <p className="text-green-800">Loading...</p>}
          {data && <Overview title="Players">
            {data.players.map((player: Player, index: number) => (
              <PlayerItem
                isHost={index === 0}
                key={index}
                player={player}/>))}
          </Overview>}
        </div>
        <div>
        <h2 className={`${styles.h2}`}>Your name</h2>
          <form className={`${styles.form}`} onSubmit={changeName}>
            <input 
              className={`${styles.lineInput}`}
              type="text"
              maxLength={20}
              value={username}
              onChange={(event) => setUsername(event.target.value) } />
            <span
              className={`${styles.errorSpan}`}>
              {usernameError}
            </span>
            {username===data?.players.find(player => player.id === Number(sessionStorage.getItem("playerID")))?.username?undefined:true && 
            <button 
              className={`${styles.blackButton}`}
              type="submit">
              Change name
            </button>}
          </form>
          <button 
              className={`${styles.pointsButton}`}
              onClick={freePoints}>
              Free points
            </button>
        </div>
        <div>
          <Overview title="Rules">
            <RuleItem
              name="Time limit"
              value="60s" />
            <RuleItem
              name="Max players"
              value="4" />
            <RuleItem
              name="Win condition"
              value="3000 points" />
          </Overview>
        </div>
      </main>
    </>
  )
}

export default ReadGameByGameCode;