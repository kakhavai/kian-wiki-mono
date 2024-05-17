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
    birthDate: new Date('1998-10-09T07:00:00.000Z'),
    jerseyNumber: 49,
    position: 'LS',
    teamId: 'ARI',
  };

  test('Successfully fetches NFL player data', async () => {
    const result = await playerDataService.getProviderPlayerData();

    // Expectations
    expect(result[0]).toEqual(expectedResult);
  }, 15000);

  test('Successfully updates NFL player data', async () => {
    const result: boolean = await playerDataService.updatePlayerRecords();

    // Expectations
    expect(result).toBe(true);
  }, 15000);

  // Add more tests as needed to cover various scenarios and edge cases
});
