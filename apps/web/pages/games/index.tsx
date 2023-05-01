import axios from 'axios';
import { getHostUrl } from '../../helpers/getHostUrl';
import { GameContextProvider } from 'contexts';
import { GetServerSidePropsContext } from 'next';
import { GamesPage } from 'ui';

export default function Games({ data, errorMessage}: IProps) {
  return (
    <GameContextProvider data={data}>
      <GamesPage logoUrl="/logo/pollgroo3.svg" />
    </GameContextProvider>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const hostUrl = getHostUrl(context.req.headers.host);
  try {
    const res = await axios.get(`${hostUrl}/api/games/get-games`, {
      headers: {
        cookie: context.req.headers.cookie,
      },
      withCredentials: true,
    });
    const data: GameCardData[] = res.data;
    return { props: { data } };
  } catch (err: any) {
    return { props: { data: [], errorMessage: err.response.data.message } };
  }
}

interface GameCardData {
  _id: string;
  title: string;
  isStarted: boolean;
  tasks: string[];
  team: {
    _id: string;
    name: string;
    members: string[];
    tasks: string[];
    games: string[];
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface IProps {
  data: GameCardData[];
  errorMessage?: string;
}
