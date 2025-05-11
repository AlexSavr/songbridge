import RoomHeader from "@/app/room/[id]/layout/header";
import RoomPlaylist from "@/app/room/[id]/layout/playlist";
import {AudioFile} from "@/types/audio";

type Props = {
  initialAudioFiles: AudioFile[];
  whereUpdated: string;
};

export default function RoomClientComponent({
                                              initialAudioFiles,
                                              whereUpdated
                                            }: Props) {

  return (
    <main className="content">
      <RoomHeader whereUpdated={whereUpdated} />
      <RoomPlaylist initialAudioFiles={initialAudioFiles} />
    </main>
  );
}