import axios, { AxiosResponse } from 'axios';
import { ITeam } from 'nfl-feed-types';
import { ITeamDTO } from '../types/dto/ITeamDTO';
import { IGetNFLTeamsResponse } from '../types/http/IGetNFLTeamsResponse';
import { ProviderHttpRequestOptions } from '../http/ProviderHttpRequestOptions';
import TeamFeedRepository from '../repositories/TeamFeedRepository';

export class TeamDataService {
  public static async updateTeamRecords(): Promise<boolean> {
    const newRecords: Array<ITeam> = await this.getTeamDataFromProvider();
    const promises: Array<Promise<boolean>> = new Array<Promise<boolean>>();

    promises.push(TeamFeedRepository.bulkDeleteMissing(newRecords));
    promises.push(TeamFeedRepository.bulkUpsertTeams(newRecords));

    try {
      await Promise.all(promises);
      return true;
    } catch (error) {
      console.error('TeamDataService: Failed to upsert teams');
      return false;
    }
  }

  public static async getTeamDataFromProvider(): Promise<ITeam[]> {
    const options: ProviderHttpRequestOptions = new ProviderHttpRequestOptions(
      'getNFLTeams',
      {
        rosters: 'true',
        schedules: 'true',
        topPerformers: 'true',
        teamStats: 'true',
      },
    );

    try {
      // Make a GET request to the API endpoint
      const response: AxiosResponse<IGetNFLTeamsResponse> =
        await axios.request<IGetNFLTeamsResponse>(
          options.getAxiosRequestOptions(),
        );

      // Check if the response is successful and parse the data
      if (
        response.status === 200 &&
        this._isITeamDTOArray(response.data.body)
      ) {
        return this._parseProviderTeamData(response.data.body);
      } else {
        throw new Error('Failed to fetch NFL team data');
      }
    } catch (error) {
      console.error('Error fetching NFL team data:', error);
      throw error;
    }
  }

  private static _parseProviderTeamData(unparsedTeams: ITeamDTO[]): ITeam[] {
    const teams: ITeam[] = [];

    for (const unparsedTeam of unparsedTeams) {
      const team: ITeam = {
        name: unparsedTeam.teamName,
        abv: unparsedTeam.teamAbv,
        wins: parseInt(unparsedTeam.wins),
        losses: parseInt(unparsedTeam.loss),
        pa: parseInt(unparsedTeam.pa),
        pf: parseInt(unparsedTeam.pf),
        tie: parseInt(unparsedTeam.tie),
        city: unparsedTeam.teamCity,
      };
      teams.push(team);
    }

    return teams;
  }

  private static _isITeamDTOArray(
    unparsedTeams: unknown,
  ): unparsedTeams is ITeamDTO[] {
    return (
      Array.isArray(unparsedTeams) &&
      unparsedTeams.every(
        (team) =>
          typeof team === 'object' &&
          team !== null &&
          'teamName' in team &&
          typeof team.teamName === 'string' &&
          'teamAbv' in team &&
          typeof team.teamAbv === 'string' &&
          'wins' in team &&
          typeof team.wins === 'string' &&
          'loss' in team &&
          typeof team.loss === 'string' &&
          'pa' in team &&
          typeof team.pa === 'string' &&
          'pf' in team &&
          typeof team.pf === 'string' &&
          'tie' in team &&
          typeof team.tie === 'string' &&
          'teamCity' in team &&
          typeof team.teamCity === 'string',
      )
    );
  }
}
