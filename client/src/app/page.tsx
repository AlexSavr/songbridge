"use client";

import styles from '../styles/main-page.module.scss';
import Button from "@/components/button";
import {useRouter} from "next/navigation";
import useSWRMutation from "swr/mutation";
import {apiCreateRoom} from "@/api/room/api.room.create";
import {toast} from "react-toastify";

const MainPage = () => {
  const router = useRouter();

  const { trigger: createRoom, isMutating } = useSWRMutation(
    'create-room',
    () => apiCreateRoom(),
    {
      onSuccess: (data) => {
        router.push(`/room/${data?.room?.id}`);
      },
      onError: (error) => {
        console.error('Ошибка при создании комнаты:', error);
        toast("При создании комнаты произошла ошибка");
      },
    }
  );

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
      <Button variant="filled" color="primary"
              onClick={() => createRoom()}
              disabled={isMutating}>
        {isMutating ? (
          <>
            Создание...
          </>
        ) : (
          'Создать комнату'
        )}
      </Button>
    </main>
  );
};

export default MainPage;
