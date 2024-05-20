import { ScheduleDataService } from '../../services/ScheduleDataService';
import { IMatch } from 'nfl-feed-types';

describe('ScheduleDataService Integration Test', () => {
  test('should fetch game details and parse the response correctly', async () => {
    const week = '1';
    const seasonType = 'post';
    const season = '2023';

    // Call the actual service method
    const result: IMatch[] = await ScheduleDataService.fetchGameDetails(
      week,
      seasonType,
      season,
    );

    // Validate the results
    expect(result).not.toBeNull();
    expect(result.length).toBeGreaterThan(0);

    // Check the first game details
    const firstGame = result[0];
    expect(firstGame).toHaveProperty('gameId');
    expect(firstGame).toHaveProperty('home');
    expect(firstGame).toHaveProperty('away');
    expect(firstGame).toHaveProperty('gameTimeEpoch');
  });
});
