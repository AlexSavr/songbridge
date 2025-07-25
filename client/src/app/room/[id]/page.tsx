import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';
import RoomClientComponent from './client';
import {apiGetRoom} from "@/api/room/api.room.get";
import {Metadata} from "next";
import {notFound} from "next/navigation";
import NotFound from "@/app/not-found";

dayjs.extend(relativeTime);
dayjs.locale('ru');

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;

  const room = await apiGetRoom({ id });

  if("error" in room && room.error) {
    return {
      title: `SongBridge. Плейлист не найден`,
    }
  }

  return {
    title: `SongBridge. Плейлист ${room.data.name ?? 'Анонимный'}`,
    openGraph: {
      title: ``,
    },
  };
}

// TODO: Change mock
const mockAudioFiles = [
  { id: 1, name: 'track1.mp3', url: '/audio/sample1.mp3' },
  { id: 2, name: 'track2.mp3', url: '/audio/sample2.mp3' },
];

const Page = async ({ params }: Props) => {
  const id = (await params).id;

  const room = await apiGetRoom({ id });

  if("error" in room && room.error) {
    if(room.error?.message) {
      return <NotFound message={room.error?.message} />
    }
    return notFound();
  }

  const whereUpdated = dayjs().subtract(1, 'day').fromNow();

  return (
    <RoomClientComponent
      initialAudioFiles={mockAudioFiles}
      whereUpdated={whereUpdated}
      data={room.data}
    />
  );
};
export default Page;
