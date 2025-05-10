import Link from "next/link";
import styles from '../styles/main-page.module.scss';

type Props = {};
const MainPage = (props: Props) => {
  return (
    <main className={styles.container}>
      <div className={styles.logo}>
        <img src="./logo.png" alt="logo"/>
        <h1 className={styles['logo-text']}>SongBridge</h1>
      </div>
      <h2 className={styles['welcome-text']}>
        Добро пожаловать!
        <p className={styles['welcome-text__description']}>
          Создайте комнату чтобы поделиться своим плейлистом
        </p>
      </h2>
      <Link href="/room/1">
        <button className="button button--primary button--flat">
          Создать комнату
        </button>
      </Link>
    </main>
  );
};

export default MainPage;
