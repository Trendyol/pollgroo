import { render, screen } from '@testing-library/react';
import Games, { getServerSideProps } from '@/pages/games';
import { getHostUrl } from '../../helpers/getHostUrl';
import axios from 'axios';

jest.mock('axios');

jest.mock('../../helpers/getHostUrl', () => ({
  getHostUrl: jest.fn(),
}));

jest.mock('@/../../packages/ui', () => ({
  GamesPage: jest.fn(({ logoUrl, errorMessage }: any) => <div data-testid="gamesPage-template">{logoUrl}</div>),
}));

describe('<Games /> specs', () => {
  it('renders the GamesPage component with the correct logo URL', () => {
    // assign
    const mockData: any = [
      { id: 1, title: 'Game 1' },
      { id: 2, title: 'Game 2' },
    ];
    // act
    render(<Games data={mockData} />);

    // assert
    expect(screen.getByTestId('gamesPage-template')).toBeInTheDocument();
  });

  describe('getServerSideProps', () => {
    it('returns data prop when the API call is successful', async () => {
      const mockData = [
        { id: 1, title: 'Game 1' },
        { id: 2, title: 'Game 2' },
      ];
      const mockResponse = { data: mockData };
      axios.get.mockResolvedValue(mockResponse);

      const mockContext = {
        req: {
          headers: {
            cookie: 'mock-cookie',
          },
        },
      };
      
      const hostUrl = "localhost:3000"
      getHostUrl.mockReturnValue(hostUrl);


      const result = await getServerSideProps(mockContext);

      expect(result).toEqual({
        props: {
          data: mockData,
        },
      });
      expect(axios.get).toHaveBeenCalledWith(`${hostUrl}/api/games/get-games`, {
        headers: {
          cookie: 'mock-cookie',
        },
        withCredentials: true,
      });
    });

    it('should return empty data and error message on failed request', async () => {
      const errorMessage = 'Error fetching games';

      axios.get.mockRejectedValue({ response: { data: { message: errorMessage } } });

      const context = {
        req: {
          headers: {
            cookie: 'your-cookie-value',
          },
        },
      };

      const hostUrl = "localhost:3000"
      getHostUrl.mockReturnValue(hostUrl);

      const result = await getServerSideProps(context);

      expect(result).toEqual({
        props: {
          data: [],
          errorMessage: errorMessage,
        },
      });
      expect(axios.get).toHaveBeenCalledWith(`${hostUrl}/api/games/get-games`, {
        headers: {
          cookie: context.req.headers.cookie,
        },
        withCredentials: true,
      });
    });
  });
});
