jest.mock('axios');
jest.mock('../../repositories/PlayerFeedRepository');

import axios from 'axios';
import { PlayerDataService } from '../../services/PlayerDataService';
import { IPlayer } from 'nfl-feed-types';
import PlayerFeedRepository from '../../repositories/PlayerFeedRepository';
import { IHttpResponse } from 'common-types';

// Mock the necessary dependencies

const mockedAxios = axios as jest.Mocked<typeof axios>;
const MockedPlayerFeedRepository =
  PlayerFeedRepository as jest.Mock<PlayerFeedRepository>;

describe('PlayerDataService', () => {
  let playerDataService: PlayerDataService;
  let mockPlayerRepo: jest.Mocked<PlayerFeedRepository>;

  beforeEach(() => {
    mockPlayerRepo =
      new MockedPlayerFeedRepository() as jest.Mocked<PlayerFeedRepository>;
    playerDataService = new PlayerDataService(mockPlayerRepo);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('updatePlayerRecords', () => {
    test('should update player records successfully', async () => {
      const mockPlayers: IPlayer[] = [
        {
          remoteId: '1',
          name: 'Player A',
          birthDate: new Date('1990-01-01'),
          jerseyNumber: 10,
          position: 'QB',
          teamId: 'teamA',
        },
        {
          remoteId: '2',
          name: 'Player B',
          birthDate: new Date('1992-02-02'),
          jerseyNumber: 20,
          position: 'RB',
          teamId: 'teamB',
        },
      ];

      jest
        .spyOn(playerDataService, 'getProviderPlayerData')
        .mockResolvedValue(mockPlayers);

      mockPlayerRepo.bulkDeleteMissing.mockResolvedValue(true);
      mockPlayerRepo.bulkUpsert.mockResolvedValue(true);

      const result = await playerDataService.updatePlayerRecords();

      expect(result).toBe(true);
      expect(playerDataService.getProviderPlayerData).toHaveBeenCalledTimes(1);
      expect(mockPlayerRepo.bulkDeleteMissing).toHaveBeenCalledWith(
        mockPlayers,
      );
      expect(mockPlayerRepo.bulkUpsert).toHaveBeenCalledWith(mockPlayers);
    });

    test('should handle errors during update', async () => {
      jest
        .spyOn(playerDataService, 'getProviderPlayerData')
        .mockRejectedValue(new Error('Failed to fetch data'));
      mockPlayerRepo.bulkDeleteMissing.mockResolvedValue(true);
      mockPlayerRepo.bulkUpsert.mockResolvedValue(true);

      const result = await playerDataService.updatePlayerRecords();

      expect(result).toBe(false);
      expect(playerDataService.getProviderPlayerData).toHaveBeenCalledTimes(1);
      expect(mockPlayerRepo.bulkDeleteMissing).not.toHaveBeenCalled();
      expect(mockPlayerRepo.bulkUpsert).not.toHaveBeenCalled();
    });
  });

  describe('getProviderPlayerData', () => {
    test('should fetch and parse player data successfully', async () => {
      const mockResponse: IHttpResponse = {
        status: 200,
        body: [
          {
            playerID: '1',
            longName: 'Player A',
            bDay: '1990-01-01',
            jerseyNum: '10',
            pos: 'QB',
            team: 'teamA',
          },
          {
            playerID: '2',
            longName: 'Player B',
            bDay: '1992-02-02',
            jerseyNum: '20',
            pos: 'RB',
            team: 'teamB',
          },
        ],
      };

      mockedAxios.request.mockResolvedValue({
        status: 200,
        data: mockResponse,
      });

      const result = await playerDataService.getProviderPlayerData();

      expect(result).toEqual([
        {
          remoteId: '1',
          name: 'Player A',
          birthDate: new Date('1990-01-01'),
          jerseyNumber: 10,
          position: 'QB',
          teamId: 'teamA',
        },
        {
          remoteId: '2',
          name: 'Player B',
          birthDate: new Date('1992-02-02'),
          jerseyNumber: 20,
          position: 'RB',
          teamId: 'teamB',
        },
      ]);
      expect(mockedAxios.request).toHaveBeenCalledTimes(1);
    });

    test('should handle errors during fetch', async () => {
      mockedAxios.request.mockRejectedValue(
        new Error('Failed to fetch NFL player data'),
      );

      await expect(playerDataService.getProviderPlayerData()).rejects.toThrow(
        'Failed to fetch NFL player data',
      );
      expect(mockedAxios.request).toHaveBeenCalledTimes(1);
    });
  });
});
