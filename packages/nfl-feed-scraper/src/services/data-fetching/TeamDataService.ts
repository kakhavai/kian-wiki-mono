import axios, { AxiosResponse } from 'axios';
import { ITeam } from 'nfl-feed-types';
import { ITeamDTO } from '../../types/dto/info/ITeamDTO';
import { IHttpResponse } from 'common-types';
import { ProviderHttpRequestOptions } from '../../http/ProviderHttpRequestOptions';
import { TeamFeedRepository } from '../../repositories/TeamFeedRepository';

export class TeamDataService {
  private _teamRepo: TeamFeedRepository;

  public constructor() {
    this._teamRepo = new TeamFeedRepository();
  }

  public async updateTeamRecords(): Promise<boolean> {
    const newRecords: Array<ITeam> = await this.getProviderTeamData();
    const promises: Array<Promise<boolean>> = new Array<Promise<boolean>>();

    promises.push(this._teamRepo.bulkDeleteMissing(newRecords));
    promises.push(this._teamRepo.bulkUpsert(newRecords));

    try {
      await Promise.all(promises);
      return true;
    } catch (error) {
      console.error('TeamDataService: Failed to upsert teams');
      return false;
    }
  }

  public async getProviderTeamData(): Promise<ITeam[]> {
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
      const response: AxiosResponse<IHttpResponse> =
        await axios.request<IHttpResponse>(options.getAxiosRequestOptions());

      // Check if the response is successful and parse the data
      if (
        response.status === 200 &&
        this._isITeamDTOArray(response.data.body)
      ) {
        return this._parseProviderTeamData(response.data.body);
      } else {
        throw new Error('TeamDataService: Failed to fetch NFL team data');
      }
    } catch (error) {
      console.error('TeamDataService: Error fetching NFL team data:', error);
      throw error;
    }
  }

  private _parseProviderTeamData(unparsedTeams: ITeamDTO[]): ITeam[] {
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

  private _isITeamDTOArray(
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
