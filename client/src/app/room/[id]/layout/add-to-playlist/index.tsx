"use client";

import {useState} from "react";
import styles from './add-to-playlist.module.scss';
import Button from "@/components/button";
import Modal from "@/components/modal";
import {CancelModalButton, ConfirmModalButton} from "@/components/modal/modal-buttons";

const RoomAddToPlaylist = () => {
  const [inputLink, setInputLink] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted link:', inputLink);
  };

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <Button variant="filled" color="accent" className={styles.add} onClick={handleToggleModal}>Загрузить трек</Button>
      <Modal
        isOpen={isModalOpen}
        onClose={handleToggleModal}
        title="Добавить в плейлист"
        content={
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputLink}
              onChange={(e) => setInputLink(e.target.value)}
              placeholder="Вставьте ссылку"
              className={styles.input}
            />
          </form>
        }
        actions={
          <>
            <CancelModalButton onClick={handleToggleModal}>Отмена</CancelModalButton>
            <ConfirmModalButton onClick={handleSubmit}>Добавить</ConfirmModalButton>
          </>
        }
      />
    </>
  );
};
export default RoomAddToPlaylist;
