import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';
import RoomClientComponent from './client';

dayjs.extend(relativeTime);
dayjs.locale('ru');

// TODO: Change mock
const mockAudioFiles = [
  { id: 1, name: 'track1.mp3', url: '/audio/sample1.mp3' },
  { id: 2, name: 'track2.mp3', url: '/audio/sample2.mp3' },
];

type Props = {};

const Page = (props: Props) => {
  // TODO: Change mock
  const whereUpdated = dayjs().subtract(1, 'day').fromNow();

  return (
    <RoomClientComponent
      initialAudioFiles={mockAudioFiles}
      whereUpdated={whereUpdated}
    />
  );
};
export default Page;
