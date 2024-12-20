import styles from "@styles/Game.module.css";

type Props = {
    title: string;
    children: React.ReactNode;
};

const Overview: React.FC<Props> = ({ title, children }: Props) => {
     return (
        <div
            className={`${styles.overview}`}>
            <h2 className={`${styles.h2}`}>{title}</h2>
            {children}
        </div>
    );
};

export default Overview;