import styles from "@styles/Home.module.css";
import Head from "next/head";
import { useRouter } from "next/navigation";
import GameService from "@services/GameService";

export default function Home() {
  const router = useRouter();

  const createGame = async () => {
    const [createdGameResponse] = await Promise.all([
      GameService.createGame()
    ])
    const [createdGame] = await Promise.all([
      createdGameResponse.json()
    ])
    console.log(createdGame.game.game_code);
    router.push("/" + createdGame.game.game_code);
  }

  return (
    <>
      <Head>
        <title>Cards Against Humanity</title>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Kanit&family=Open+Sans&display=swap" rel="stylesheet" />

        <meta name="description" content="By Arne and Christophe" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main}`}>
        <h1 className={`${styles.h1}`}>Cards Against Humanity</h1>
        <article className={`${styles.article}`}>
          <h2 className={`${styles.h2}`}>What's your name?</h2>
          <input className={`${styles.lineInput}`} type="text" placeholder="Username..." maxLength={24} />
          <h3 className={`${styles.h3}`}>Join a game</h3>
          <div className={`${styles.div}`}>
            <input className={`${styles.boxInput}`} type="text" placeholder="Code..." maxLength={4} />
            <button className={`${styles.join}`}>Join</button>
          </div>
          <h4 className={`${styles.h4}`}><span className={`${styles.span}`}>or</span></h4>
          <button 
            className={`${styles.create}`}
            onClick={createGame}>Create a game</button>
        </article>
      </main>
    </>
  );
}
