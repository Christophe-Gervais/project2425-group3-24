import styles from "@styles/Game.module.css";

type Props = {
    name: string;
    value: string;
};

const RuleItem: React.FC<Props> = ({ name, value }: Props) => {
     return (
        <>
        <div
            className={`${styles.item}`}>
            <p className={`${styles.username}`}>{name}</p>
            <p className={`${styles.score}`}>{value}</p>
        </div></>
    );
};

export default RuleItem;