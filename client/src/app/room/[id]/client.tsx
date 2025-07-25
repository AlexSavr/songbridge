import RoomHeader from "@/app/room/[id]/layout/header";
import RoomPlaylist from "@/app/room/[id]/layout/playlist";
import {AudioFile} from "@/types/audio";
import {Room} from "@/api/room/types";

type Props = {
  initialAudioFiles: AudioFile[];
  whereUpdated: string;
  data: Room;
}

export default function RoomClientComponent({
                                              initialAudioFiles,
                                              whereUpdated,
                                              data
                                            }: Props) {

  return (
    <main className="content">
      <RoomHeader roomData={data} whereUpdated={whereUpdated}/>
      <RoomPlaylist initialAudioFiles={initialAudioFiles} roomData={data}/>
    </main>
  );
}