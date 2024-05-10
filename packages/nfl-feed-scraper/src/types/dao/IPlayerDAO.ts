import { IPlayer } from 'nfl-feed-types';

export interface IPlayerDAO extends IPlayer {
  createdAt: Date;
  remoteId: string;
}
