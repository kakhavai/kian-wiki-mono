import { ITeam } from 'nfl-feed-types';

export interface ITeamDAO extends ITeam {
  id: number;
  createdAt: Date;
}
