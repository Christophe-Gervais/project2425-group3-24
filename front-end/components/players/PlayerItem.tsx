import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from '@fortawesome/free-solid-svg-icons'
import styles from "@styles/Game.module.css";
import { Player } from "@types";

type Props = {
    player: Player;
    isHost: boolean;
};

const PlayerItem: React.FC<Props> = ({ player, isHost }: Props) => {
     return (
        <>
        <div
            className={`${styles.item}`}>
            {isHost && <FontAwesomeIcon
            className={`${styles.icon}`}
                icon={faCrown} />}
            <p className={`${styles.username}`}>{player.username}</p>
            <p className={`${styles.score}`}>{player.score} points</p>
        </div></>
    );
};

export default PlayerItem;