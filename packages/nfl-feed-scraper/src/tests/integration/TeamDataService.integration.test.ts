import { TeamDataService } from '../../services/data-fetching/TeamDataService';

const teamDataService = new TeamDataService();

describe('TeamDataService (Integration Tests)', () => {
  test('Successfully fetches NFL team data', async () => {
    const result = await teamDataService.getProviderTeamData();

    // Expectations
    expect(result[0]).toBeDefined();
  }, 15000);

  // Add more tests as needed to cover various scenarios and edge cases
});
