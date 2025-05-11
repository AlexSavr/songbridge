import styles from '../styles/main-page.module.scss';
import Button from "@/components/button";

const MainPage = () => {
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
      <Button variant="filled" color="primary" href="/room/1">
        Создать комнату
      </Button>
    </main>
  );
};

export default MainPage;
