import { IDstStatsDTO } from './IDstStatsDTO';
import { ILineScoreDTO } from './ILineScoreDTO';
import { IPlayerMatchStatsDTO } from './IPlayerMatchStatsDTO';
import { IScoringPlayDTO } from './IScoringPlayDTO';
import { ITeamStatsDTO } from './ITeamStatsDTO';

export interface IBoxScoreDTO {
  gameStatus: string;
  teamStats: {
    away: ITeamStatsDTO;
    home: ITeamStatsDTO;
  };
  gameDate: string;
  scoringPlays: IScoringPlayDTO[];
  network: string;
  teamIDHome: string;
  homeResult: string;
  away: string;
  attendance: string;
  lineScore: ILineScoreDTO;
  currentPeriod: string;
  gameLocation: string;
  home: string;
  playerStats: IPlayerMatchStatsDTO;
  arenaCapacity: string;
  arena: string;
  homePts: string;
  awayResult: string;
  teamIDAway: string;
  Referees: string;
  gameClock: string;
  awayPts: string;
  gameID: string;
  seasonType: string;
  DST: {
    away: IDstStatsDTO;
    home: IDstStatsDTO;
  };
}
