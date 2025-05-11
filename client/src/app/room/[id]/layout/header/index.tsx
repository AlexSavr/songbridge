import styles from './room-header.module.scss';
import Button from "@/components/button";
import AddToPlaylist from "@/app/room/[id]/layout/add-to-playlist";

type Props = {
  whereUpdated: string;
};

// TODO: Change mock
const roomName = 'Анонимная комната';

const RoomHeader = ({ whereUpdated }: Props) => {
  return (
    <header className={styles.container}>
      <div className={styles['basic-info']}>
        <p className={styles['playlist-label']}>Плейлист</p>
        <h1 className={styles.title}>{ roomName }</h1>
        <p className={styles['where-updated']}>Обновлен <span>{whereUpdated}</span></p>
      </div>
      <div className={styles['actions']}>
        <Button variant="filled" color="primary" className={styles['add-to-playlist']}>Слушать</Button>
        <AddToPlaylist />
        <Button variant="filled" className={styles['share-playlist']}>Поделиться</Button>
      </div>
    </header>
  );
};
export default RoomHeader;
