// src/__tests__/BoxScoreDataService.test.ts

import { BoxScoreDataService } from '../../services/data-fetching/BoxScoreDataService';
import { IBoxScoreDTO } from '../../types/dto/box-score/IBoxScoreDTO';

describe('BoxScoreDataService Integration Test', () => {
  test('should fetch game details and return valid IBoxScoreDTO array', async () => {
    const gameId = '20240121_KC@BUF';
    const playByPlay = false;

    const boxScore: IBoxScoreDTO = await BoxScoreDataService.fetchGameDetails(
      gameId,
      playByPlay,
    );

    expect(boxScore).toHaveProperty('gameStatus');
    expect(boxScore).toHaveProperty('teamStats');
    expect(boxScore).toHaveProperty('gameDate');
    expect(boxScore).toHaveProperty('scoringPlays');
    expect(boxScore).toHaveProperty('network');
    expect(boxScore).toHaveProperty('teamIDHome');
    expect(boxScore).toHaveProperty('homeResult');
    expect(boxScore).toHaveProperty('away');
    expect(boxScore).toHaveProperty('attendance');
    expect(boxScore).toHaveProperty('lineScore');
    expect(boxScore).toHaveProperty('currentPeriod');
    expect(boxScore).toHaveProperty('gameLocation');
    expect(boxScore).toHaveProperty('home');
    expect(boxScore).toHaveProperty('playerStats');
    expect(boxScore).toHaveProperty('arenaCapacity');
    expect(boxScore).toHaveProperty('arena');
    expect(boxScore).toHaveProperty('homePts');
    expect(boxScore).toHaveProperty('awayResult');
    expect(boxScore).toHaveProperty('teamIDAway');
    expect(boxScore).toHaveProperty('Referees');
    expect(boxScore).toHaveProperty('gameClock');
    expect(boxScore).toHaveProperty('awayPts');
    expect(boxScore).toHaveProperty('gameID');
    expect(boxScore).toHaveProperty('seasonType');
    expect(boxScore).toHaveProperty('DST');
  });
});
