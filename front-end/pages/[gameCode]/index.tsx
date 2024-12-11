import styles from "@styles/Game.module.css";
import Head from "next/head";
import Header from "@components/header";
import { useRouter } from "next/router";

const ReadLecturerById = () => {
  const router = useRouter();
  const { gameCode } = router.query;

  return (
    <>
      <Head>
        <title>Round 1</title>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Kanit&family=Open+Sans&display=swap" rel="stylesheet" />

        <meta name="description" content="By Arne and Christophe" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={`${styles.main}`}>
        <h1 className={`${styles.h1}`}>Game lobby {gameCode}</h1>
      </main>
    </>
  )
}

export default ReadLecturerById;