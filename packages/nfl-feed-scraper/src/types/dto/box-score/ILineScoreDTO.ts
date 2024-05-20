export interface ILineScoreDTO {
  period: string;
  gameClock: string;
  away: {
    Q1: string;
    Q2: string;
    Q3: string;
    Q4: string;
    teamID: string;
    totalPts: string;
    teamAbv: string;
  };
  home: {
    Q1: string;
    Q2: string;
    Q3: string;
    Q4: string;
    teamID: string;
    totalPts: string;
    teamAbv: string;
  };
}
