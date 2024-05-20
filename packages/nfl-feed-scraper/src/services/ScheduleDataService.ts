import axios, { AxiosResponse } from 'axios';
import { IMatch } from 'nfl-feed-types';
import { ProviderHttpRequestOptions } from '../http/ProviderHttpRequestOptions';
import { IMatchDTO } from '../types/dto/info/IMatchDTO';
import { IHttpResponse } from 'common-types';

export class ScheduleDataService {
  public static async fetchGameDetails(
    week: string,
    seasonType: string,
    season: string,
  ): Promise<IMatch[]> {
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
      if (
        response.status === 200 &&
        this._isIMatchDTOArray(response.data.body)
      ) {
        return this._parseMatchDetails(response.data.body);
      } else {
        throw new Error('ScheduleDataService: Invalid response format');
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  private static _parseMatchDetails(data: IMatchDTO[]): IMatch[] {
    return data.map((game) => ({
      gameId: game.gameID,
      home: game.home,
      away: game.away,
      gameTimeEpoch: parseFloat(game.gameTime_epoch), // Convert to number
    }));
  }

  private static _isIMatchDTOArray(
    unparsedGameDetails: unknown[],
  ): unparsedGameDetails is IMatchDTO[] {
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
