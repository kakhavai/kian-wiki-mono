import axios, { AxiosResponse } from 'axios';
import { IPlayer } from 'nfl-feed-types';
import { ProviderHttpRequestOptions } from '../../http/ProviderHttpRequestOptions';
import { PlayerFeedRepository } from '../../repositories/PlayerFeedRepository';
import { IPlayerDTO } from '../../types/dto/info/IPlayerDTO';
import { IHttpResponse } from 'common-types';

const relevantPositions: string[] = ['K', 'QB', 'RB', 'TE', 'WR'];

export class PlayerDataService {
  private _playerRepo: PlayerFeedRepository;

  public constructor(playerRepo?: PlayerFeedRepository) {
    this._playerRepo = playerRepo || new PlayerFeedRepository();
  }

  public async updatePlayerRecords(): Promise<boolean> {
    try {
      const newRecords: IPlayer[] = await this.getProviderPlayerData();
      const relevantPlayers: IPlayer[] =
        this._extractRelevantPlayers(newRecords);

      const promises: Promise<boolean>[] = [
        this._playerRepo.bulkDeleteMissing(relevantPlayers),
        this._playerRepo.bulkUpsert(relevantPlayers),
      ];

      await Promise.all(promises);
      return true;
    } catch (error) {
      console.error('PlayerDataService: Failed to upsert players', error);
      return false;
    }
  }

  public async getProviderPlayerData(): Promise<IPlayer[]> {
    const options: ProviderHttpRequestOptions = new ProviderHttpRequestOptions(
      'getNFLPlayerList',
      {},
    );

    try {
      const response: AxiosResponse<IHttpResponse> =
        await axios.request<IHttpResponse>(options.getAxiosRequestOptions());

      if (response.status === 200) {
        const validPlayerDtos: IPlayerDTO[] = this._filterValidIPlayerDTOArray(
          response.data.body,
        );
        return this._parseProviderPlayerData(validPlayerDtos);
      } else {
        throw new Error('PlayerDataService: Failed to fetch NFL player data');
      }
    } catch (error) {
      console.error(
        'PlayerDataService: Error fetching NFL player data:',
        error,
      );
      throw error;
    }
  }

  private _extractRelevantPlayers(players: IPlayer[]): IPlayer[] {
    return players.filter((player) =>
      relevantPositions.includes(player.position),
    );
  }

  private _parseProviderPlayerData(unparsedPlayers: IPlayerDTO[]): IPlayer[] {
    return unparsedPlayers.map((unparsedPlayer) => ({
      remoteId: unparsedPlayer.playerID,
      name: unparsedPlayer.longName,
      birthDate: new Date(unparsedPlayer.bDay),
      jerseyNumber: parseInt(unparsedPlayer.jerseyNum) || -1,
      position: unparsedPlayer.pos,
      teamId: unparsedPlayer.team,
    }));
  }
  private _filterValidIPlayerDTOArray(unparsedPlayers: unknown): IPlayerDTO[] {
    if (!Array.isArray(unparsedPlayers)) {
      console.error('PlayerDataService: Not an array:', unparsedPlayers);
      return [];
    }

    const validPlayers: IPlayerDTO[] = [];
    for (const player of unparsedPlayers) {
      if (this._isIPlayerDTO(player)) {
        validPlayers.push(player as IPlayerDTO);
      }
    }

    return validPlayers;
  }
  private _isIPlayerDTO(unparsedPlayer: unknown): unparsedPlayer is IPlayerDTO {
    return (
      typeof unparsedPlayer === 'object' &&
      unparsedPlayer !== null &&
      'playerID' in unparsedPlayer &&
      typeof unparsedPlayer.playerID === 'string' &&
      'bDay' in unparsedPlayer &&
      typeof unparsedPlayer.bDay === 'string' &&
      'jerseyNum' in unparsedPlayer &&
      typeof unparsedPlayer.jerseyNum === 'string' &&
      'team' in unparsedPlayer &&
      typeof unparsedPlayer.team === 'string' &&
      unparsedPlayer.team.length > 0 &&
      'longName' in unparsedPlayer &&
      typeof unparsedPlayer.longName === 'string' &&
      'pos' in unparsedPlayer &&
      typeof unparsedPlayer.pos === 'string'
    );
  }
}
