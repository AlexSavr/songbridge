import styles from './room-header.module.scss';

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
        <button className={[styles['add-to-playlist'], 'button button--accent'].join(' ')}>Слушать</button>
        <button className={[styles['share-playlist'], 'button button--primary'].join(' ')}>Поделиться</button>
      </div>
    </header>
  );
};
export default RoomHeader;
