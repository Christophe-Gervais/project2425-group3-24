import styles from "@styles/Header.module.css";
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header>
      <nav
        className={`${styles.nav}`}>
        <Link
          href="/"
          className={`${styles.navButton}`}>
          Leave Game
        </Link>
        <h1 className={`${styles.h1}`}>Cards Against Humanity</h1>
      </nav>
    </header>
  );
};

export default Header;