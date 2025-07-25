"use client";

import {useState} from "react";
import {AudioFile} from "@/types/audio";
import styles from './room-playlist.module.scss';
import {Room} from "@/api/room/types";

type Props = {
  initialAudioFiles: AudioFile[];
  roomData: Room;
};

const RoomPlaylist = ({ initialAudioFiles }: Props) => {
  const [audioFiles, setAudioFiles] = useState(initialAudioFiles);

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {audioFiles.map((file) => (
          <li key={file.id} className={styles.element}>
            <p>{file.name.replace('.mp3', '')}</p>
            <audio controls src={file.url} />
          </li>
        ))}
      </ul>
    </div>
  )
};
export default RoomPlaylist;
