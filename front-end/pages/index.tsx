import GameForm from "@components/games/GameForm";
import styles from "@styles/Home.module.css";
import Head from "next/head";

export default function Home() {
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
        <GameForm />
      </main>
    </>
  );
}