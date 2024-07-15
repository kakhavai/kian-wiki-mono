import { IWrProjectionData } from 'nfl-feed-types';

export interface IWRStatsResponse {
  stats: IWrProjectionData[];
  lastUpdated: string;
}
