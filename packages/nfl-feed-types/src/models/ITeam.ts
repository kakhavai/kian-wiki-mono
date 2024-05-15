export interface ITeam {
  [key: string]: string | number | boolean | Date;
  name: string;
  abv: string;
  wins: number;
  losses: number;
  pa: number;
  pf: number;
  tie: number;
  city: string;
}
