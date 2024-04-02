import { NFLTeamDataService } from '../../services/NFLTeamDataService';
import { ITeam } from 'nfl-feed-types';

describe('NFLTeamDataService (Unit Tests)', () => {
  const expectedResult: ITeam = {
    name: 'Cardinals',
    abv: 'ARI',
    wins: 4,
    losses: 13,
    pa: 455,
    pf: 330,
    tie: 0,
    city: 'Arizona',
  };

  test('Successfully fetches NFL team data', async () => {
    const result = await NFLTeamDataService.getNFLTeamData();

    // Expectations
    expect(result[0]).toEqual(expectedResult);
  }, 15000);

  // Add more tests as needed to cover various scenarios and edge cases
});
