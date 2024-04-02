import axios, { AxiosResponse } from 'axios';
import { ITeam } from 'nfl-feed-types';
import { IHttpRequestOptions } from 'common-types';
import { ITeamDTO } from '../types/dto/ITeamDTO';
import { IGetNFLTeamsResponse } from '../types/http/IGetNFLTeamsResponse';

export class NFLTeamDataService {
  public static async getNFLTeamData(): Promise<ITeam[]> {
    const options: IHttpRequestOptions = {
      method: 'GET',
      url: `${process.env.RAPID_API_URL}/getNFLTeams`,
      params: {
        rosters: 'true',
        schedules: 'true',
        topPerformers: 'true',
        teamStats: 'true',
      },
      headers: {
        'X-RapidAPI-Key': `${process.env.RAPID_API_KEY}`,
        'X-RapidAPI-Host': `${process.env.RAPID_API_HOST}`,
      },
    };

    try {
      // Make a GET request to the API endpoint
      const response: AxiosResponse<IGetNFLTeamsResponse> =
        await axios.request<IGetNFLTeamsResponse>(options);

      // Check if the response is successful and parse the data
      if (
        response.status === 200 &&
        this._isITeamDTOArray(response.data.body)
      ) {
        return this._parseTeamData(response.data.body);
      } else {
        throw new Error('Failed to fetch NFL team data');
      }
    } catch (error) {
      console.error('Error fetching NFL team data:', error);
      throw error;
    }
  }

  private static _parseTeamData(unparsedTeams: ITeamDTO[]): ITeam[] {
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
