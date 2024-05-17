import { IPlayer } from 'nfl-feed-types';

export interface IPlayerDAO extends IPlayer {
  id: string;
  createdAt: Date;
}
