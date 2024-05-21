export interface IWrMatchStatsDTO {
  fantasyPoints: number;
  fumblesLost: number;
  passAttempts: number;
  passTD: number;
  passYds: number;
  int: number;
  passingTwoPointConversion: number;
  passCompletions: number;
  rushAvg: number;
  rushYds: number;
  carries: number;
  longRush: number;
  rushTD: number;
  receptions: number;
  recTD: number;
  longRec: number;
  targets: number;
  recYds: number;
  receivingTwoPointConversion: number;
  //   fantasyPointsDefault: {
  //     standard: number;
  //     PPR: number;
  //     halfPPR: number;
  //   };

  // Scoring plays (if applicable)
  //   scoringPlays?: Array<{
  //     score: string;
  //     scorePeriod: string;
  //     homeScore: string;
  //     awayScore: string;
  //     teamID: string;
  //     scoreDetails: string;
  //     scoreType: string;
  //     scoreTime: string;
  //     team: string;
  //     playerIDs: string[];
  //   }>;

  // Defense statistics (if applicable)
  //   Defense?: {
  //     totalTackles: number;
  //     defTD: number;
  //     soloTackles: number;
  //     tfl: number;
  //     qbHits: number;
  //     defensiveInterceptions: number;
  //     sacks: number;
  //     passDeflections: number;
  //     fumblesLost?: number;
  //     fumbles?: number;
  //     fumblesRecovered?: number;
  //   };

  // Rushing statistics (if applicable)
  //   Rushing?: {
  //     rushAvg: number;
  //     rushYds: number;
  //     carries: number;
  //     longRush: number;
  //     rushTD: number;
  //   };

  // Passing statistics (if applicable)
  //   Passing?: {
  //     qbr: number;
  //     rtg: number;
  //     sacked: string;
  //     passAttempts: number;
  //     passAvg: number;
  //     passTD: number;
  //     passYds: number;
  //     int: number;
  //     passingTwoPointConversion?: number;
  //     passCompletions: number;
  //   };

  //   // Receiving statistics (if applicable)
  //   Receiving?: {
  //     receptions: number;
  //     recTD: number;
  //     longRec: number;
  //     targets: number;
  //     recYds: number;
  //     recAvg: number;
  //     receivingTwoPointConversion?: number;
  //   };

  // Kicking statistics (if applicable)
  //   Kicking?: {
  //     fgLong: number;
  //     fgMade: number;
  //     fgAttempts: number;
  //     xpMade: number;
  //     fgPct: number;
  //     kickingPts: number;
  //     xpAttempts: number;
  //   };

  // Punting statistics (if applicable)
  //   Punting?: {
  //     puntYds: number;
  //     punts: number;
  //     puntAvg: number;
  //     puntsin20: number;
  //     puntTouchBacks: number;
  //     puntLong: number;
  //     puntReturns?: number;
  //     puntReturnYds?: number;
  //     puntReturnAvg?: number;
  //     puntReturnLong?: number;
  //     puntReturnTD?: number;
  //   };
}
