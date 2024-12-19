import styles from "@styles/Header.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";
import PlayerService from "@services/PlayerService";
import { useRouter } from "next/navigation";

type Props = {
  gameCode: string;
  UpdateClients: () => void;
};

const Header: React.FC<Props> = ({ gameCode, UpdateClients }: Props) => {
  const router = useRouter();
  const [toastVisible, setToastVisible] = useState(false);

  const leaveGame = async () => {
    const [deletedPlayerResponse] = await Promise.all([
      PlayerService.deleteById(Number(sessionStorage.getItem("playerID")))
    ]);
    const [updatedPlayer] = await Promise.all([
      deletedPlayerResponse.json()
    ]);

    UpdateClients();
    router.replace("/");
  }
  return (
    <header>
      <nav
        className={`${styles.nav}`}>
        <button 
          onClick={leaveGame}
          className={`${styles.navButton}`}>
          Leave Game
        </button>
        <div className={`${styles.div}`}>
          <h1 className={`${styles.h1}`}>Cards Against Humanity</h1>
          <a 
            className={`${styles.code}`}
            onClick={() => { navigator.clipboard.writeText(`http://localhost:8080/${gameCode}`); setToastVisible(true); setTimeout(()=>{ setToastVisible(false); }, 1500);}}>
            Game {gameCode}
            <FontAwesomeIcon
              size="xs"
              className={`${styles.icon}`}
              icon={faCopy} />
          </a>
          <span className={`${styles.toast} ${toastVisible && styles.visibleToast}`}>Copied link!</span>
        </div>
      </nav>
    </header>
  );
};

export default Header;