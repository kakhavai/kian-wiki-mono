import { IPlayer } from 'nfl-feed-types';

export interface IPlayerDAO extends IPlayer {
  id: number; // Assuming id is optional or handled by the database
  createdAt: Date;
}
