import { IScoringPlayDTO } from './IScoringPlayDTO';

export interface IPlayerMatchStats {
  [playerID: string]: {
    gameID: string;
    teamID: string;
    team: string;
    teamAbv: string;
    Defense?: {
      totalTackles?: string;
      defTD?: string;
      soloTackles?: string;
      tfl?: string;
      qbHits?: string;
      defensiveInterceptions?: string;
      sacks?: string;
      passDeflections?: string;
      fumblesLost?: string;
      fumbles?: string;
      fumblesRecovered?: string;
    };
    Rushing?: {
      rushAvg?: string;
      rushYds?: string;
      carries?: string;
      longRush?: string;
      rushTD?: string;
    };
    Receiving?: {
      receptions?: string;
      recTD?: string;
      longRec?: string;
      targets?: string;
      recYds?: string;
      recAvg?: string;
    };
    Passing?: {
      qbr?: string;
      rtg?: string;
      sacked?: string;
      passAttempts?: string;
      passAvg?: string;
      passTD?: string;
      passYds?: string;
      int?: string;
      passCompletions?: string;
    };
    Kicking?: {
      fgLong?: string;
      fgMade?: string;
      fgAttempts?: string;
      xpMade?: string;
      fgPct?: string;
      kickingPts?: string;
      xpAttempts?: string;
      kickReturns?: string;
      kickReturnTD?: string;
      kickReturnYds?: string;
      kickReturnAvg?: string;
      kickReturnLong?: string;
    };
    Punting?: {
      puntYds?: string;
      punts?: string;
      puntAvg?: string;
      puntsin20?: string;
      puntTouchBacks?: string;
      puntLong?: string;
      puntReturns?: string;
      puntReturnYds?: string;
      puntReturnAvg?: string;
      puntReturnLong?: string;
      puntReturnTD?: string;
    };
    scoringPlays?: IScoringPlayDTO[];
    longName: string;
    fantasyPoints: string;
    fantasyPointsDefault: {
      standard: string;
      PPR: string;
      halfPPR: string;
    };
  };
}
