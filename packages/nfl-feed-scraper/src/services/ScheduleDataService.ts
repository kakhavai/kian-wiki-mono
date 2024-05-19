import axios, { AxiosResponse } from 'axios';
import { IGameDetails } from 'nfl-feed-types';
import { ProviderHttpRequestOptions } from '../http/ProviderHttpRequestOptions';
import { IGameDetailsDTO } from '../types/dto/IGameDetailsDTO';
import { IHttpResponse } from 'common-types';

export class ScheduleDataService {
  public static async fetchGameDetails(
    week: string,
    seasonType: string,
    season: string,
  ): Promise<IGameDetails[]> {
    const requestOptions: ProviderHttpRequestOptions =
      new ProviderHttpRequestOptions('getNFLGamesForWeek', {
        week,
        seasonType,
        season,
      });

    try {
      const response: AxiosResponse<IHttpResponse> = await axios.request(
        requestOptions.getAxiosRequestOptions(),
      );
      if (this._isValidApiResponse(response.data.body)) {
        return this._parseGameDetails(response.data.body);
      } else {
        throw new Error('ScheduleDataService: Invalid response format');
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  private static _isValidApiResponse(
    data: unknown[],
  ): data is IGameDetailsDTO[] {
    return Array.isArray(data) && this._isIGameDetailsArray(data);
  }

  private static _parseGameDetails(data: IGameDetailsDTO[]): IGameDetails[] {
    return data.map((game) => ({
      gameId: game.gameID,
      home: game.home,
      away: game.away,
      gameTimeEpoch: parseFloat(game.gameTime_epoch), // Convert to number
    }));
  }

  private static _isIGameDetailsArray(
    unparsedGameDetails: unknown[],
  ): unparsedGameDetails is IGameDetailsDTO[] {
    return (
      Array.isArray(unparsedGameDetails) &&
      unparsedGameDetails.every(
        (gameDetail) =>
          typeof gameDetail === 'object' &&
          gameDetail !== null &&
          'gameID' in gameDetail &&
          typeof gameDetail.gameID === 'string' &&
          'home' in gameDetail &&
          typeof gameDetail.home === 'string' &&
          'away' in gameDetail &&
          typeof gameDetail.away === 'string' &&
          'gameTime_epoch' in gameDetail &&
          typeof gameDetail.gameTime_epoch === 'string',
      )
    );
  }
}
