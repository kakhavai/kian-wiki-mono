import { PlayerDataService } from '../../services/PlayerDataService';
import TeamFeedRepository from '../../repositories/TeamFeedRepository';
import { testTeamData } from '../data/TestTeamData';
const playerDataService = new PlayerDataService();

describe('PlayerDataService (Integration Tests)', () => {
  const teamRepo: TeamFeedRepository = new TeamFeedRepository();

  beforeAll(async () => {
    await teamRepo.bulkUpsert(testTeamData);
  });

  const expectedResult = {
    remoteId: '4240499',
    name: 'Jack Coco',
    birthDate: new Date('1998-10-09T00:00:00.000Z'), // Use midnight UTC to avoid timezone issues
    jerseyNumber: 49,
    position: 'LS',
    teamId: 'ARI',
  };

  test('Successfully fetches NFL player data', async () => {
    const result = await playerDataService.getProviderPlayerData();

    // Helper function to normalize dates to YYYY-MM-DD in UTC
    const normalizeDateToUTC = (date: Date): Date => {
      const d = new Date(date);
      return new Date(
        Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()),
      );
    };

    // Expectations
    expect(result[0].remoteId).toBe(expectedResult.remoteId);
    expect(result[0].name).toBe(expectedResult.name);
    expect(normalizeDateToUTC(result[0].birthDate)).toEqual(
      normalizeDateToUTC(expectedResult.birthDate),
    ); // Compare normalized UTC dates
    expect(result[0].jerseyNumber).toBe(expectedResult.jerseyNumber);
    expect(result[0].position).toBe(expectedResult.position);
    expect(result[0].teamId).toBe(expectedResult.teamId);
  }, 15000);

  test('Successfully updates NFL player data', async () => {
    const result: boolean = await playerDataService.updatePlayerRecords();

    // Expectations
    expect(result).toBe(true);
  }, 15000);

  // Add more tests as needed to cover various scenarios and edge cases
});
