"use client";

import {useState} from "react";
import styles from './add-to-playlist.module.scss';

type Props = {};

const RoomAddToPlaylist = (props: Props) => {
  const [inputLink, setInputLink] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted link:', inputLink);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputLink}
        onChange={(e) => setInputLink(e.target.value)}
        placeholder="Вставьте ссылку"
        className={styles.input}
      />
      <button className={[styles.submit, 'button button--primary button--flat'].join(' ')} type="submit">Добавить</button>
    </form>
  );
};
export default RoomAddToPlaylist;
