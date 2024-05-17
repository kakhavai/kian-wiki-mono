// Mocking the axios module
jest.mock('axios');

import axios from 'axios';
import { TeamDataService } from '../../services/TeamDataService';
import { ITeamDTO } from '../../types/dto/ITeamDTO';
import { ITeam } from 'nfl-feed-types';
import { IHttpResponse } from 'common-types';

const mockedAxios = axios as jest.Mocked<typeof axios>;

const teamDataService = new TeamDataService();

describe('TeamDataService (Unit Tests)', () => {
  // Test data for mocking responses

  const mockResponseData: ITeamDTO[] = [
    {
      teamName: 'New England Patriots',
      teamAbv: 'NE',
      wins: '12',
      loss: '4',
      pa: '225',
      pf: '400',
      tie: '0',
      teamCity: 'Foxborough',
    },
  ];

  const mockHttpResponse: IHttpResponse = {
    status: 200,
    body: mockResponseData,
  };

  const expectedResult: ITeam[] = [
    {
      name: 'New England Patriots',
      abv: 'NE',
      wins: 12,
      losses: 4,
      pa: 225,
      pf: 400,
      tie: 0,
      city: 'Foxborough',
    },
  ];

  beforeEach(() => {
    // Reset mock before each test if necessary
    mockedAxios.request.mockReset();
  });

  test('Successfully fetches NFL team data', async () => {
    // Setup mocked axios response
    mockedAxios.request.mockResolvedValue({
      status: 200,
      data: mockHttpResponse,
    });

    const result = await teamDataService.getProviderTeamData();

    // Expectations
    expect(result).toEqual(expectedResult);
    expect(mockedAxios.request).toHaveBeenCalledTimes(1);
    expect(mockedAxios.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'GET',
        url: expect.stringContaining('/getNFLTeams'),
        params: expect.objectContaining({
          rosters: 'true',
          schedules: 'true',
          topPerformers: 'true',
          teamStats: 'true',
        }),
      }),
    );
  });

  test('Handles failure in fetching NFL team data', async () => {
    // Setup mocked axios failure
    mockedAxios.request.mockRejectedValue(new Error('Network error'));

    await expect(teamDataService.getProviderTeamData()).rejects.toThrow(
      'Network error',
    );
    expect(mockedAxios.request).toHaveBeenCalledTimes(1);
  });

  // Add more tests as needed to cover various scenarios and edge cases
});
