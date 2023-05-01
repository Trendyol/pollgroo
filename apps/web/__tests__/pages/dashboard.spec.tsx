import { render, screen } from '@testing-library/react';
import Dashboard, { getServerSideProps }  from '@/pages/dashboard';
import { getHostUrl } from '../../helpers/getHostUrl';
import axios from 'axios';

jest.mock('axios');

jest.mock('../../helpers/getHostUrl', () => ({
  getHostUrl: jest.fn(),
}));

jest.mock('@/../../packages/ui', () => ({
  DashboardPage: jest.fn(({ logoUrl }: any) => <div data-testid="dashboardPage-template">{logoUrl}</div>),
}));

describe('<Dashboard /> specs', () => {
  it('renders the DashboardPage component with the correct logo URL', () => {
    // assign
    const mockData: any = [{ id: 1, title: 'Game 1' }, { id: 2, title: 'Game 2' }];
    // act
    render(<Dashboard data={mockData}/>);

    // assert
    expect(screen.getByTestId("dashboardPage-template")).toBeInTheDocument();
  });

  describe('getServerSideProps', () => {
    it('returns data prop when the API call is successful', async () => {
      const mockData = [{ id: 1, title: 'Game 1' }, { id: 2, title: 'Game 2' }];
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
  
    it('returns empty data prop when the API call fails', async () => {
      axios.get.mockRejectedValue(new Error('API Error'));
  
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
          data: [],
        },
      });
      expect(axios.get).toHaveBeenCalledWith(`${hostUrl}/api/games/get-games`, {
        headers: {
          cookie: 'mock-cookie',
        },
        withCredentials: true,
      });
    });
  });
});
