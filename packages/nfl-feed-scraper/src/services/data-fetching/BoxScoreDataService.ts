import { IHttpResponse } from 'common-types';
import { ConversionUtil } from 'common-utils';
import axios, { AxiosResponse } from 'axios';
import { FantasyScoringRules } from 'nfl-feed-types';
import { ProviderHttpRequestOptions } from '../../http/ProviderHttpRequestOptions';
import { IBoxScoreDTO } from '../../types/dto/box-score/IBoxScoreDTO';
import { IDstStatsDTO } from '../../types/dto/box-score/IDstStatsDTO';
import { ILineScoreDTO } from '../../types/dto/box-score/ILineScoreDTO';
import { IPlayerMatchStatsDTO } from '../../types/dto/box-score/IPlayerMatchStatsDTO';
import { IScoringPlayDTO } from '../../types/dto/box-score/IScoringPlayDTO';
import { ITeamStatsDTO } from '../../types/dto/box-score/ITeamStatsDTO';

export class BoxScoreDataService {
  public static async fetchGameDetails(
    gameId: string,
    playByPlay: boolean,
  ): Promise<IBoxScoreDTO> {
    const requestOptions: ProviderHttpRequestOptions =
      new ProviderHttpRequestOptions('getNFLBoxScore', {
        gameID: gameId,
        playByPlay: playByPlay.toString(),
        fantasyPoints: 'true',
        ...ConversionUtil.convertEnumValuesToString(FantasyScoringRules),
      });

    try {
      const response: AxiosResponse<IHttpResponse> = await axios.request(
        requestOptions.getAxiosRequestOptions(),
      );

      if (response.status === 200 && this._isIBoxScoreDTO(response.data.body)) {
        return response.data.body as IBoxScoreDTO;
      } else {
        throw new Error(
          `BoxScoreDataService: Invalid response format ${response.data.body} ${gameId}`,
        );
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  private static _isIBoxScoreDTO(unparsed: unknown): unparsed is IBoxScoreDTO {
    if (
      typeof unparsed === 'object' &&
      unparsed !== null &&
      'gameStatus' in unparsed &&
      'teamStats' in unparsed &&
      typeof unparsed.teamStats === 'object' &&
      unparsed.teamStats !== null &&
      'away' in unparsed.teamStats &&
      'home' in unparsed.teamStats &&
      this._isITeamStatsDTO(unparsed.teamStats.away) &&
      this._isITeamStatsDTO(unparsed.teamStats.home) &&
      'gameDate' in unparsed &&
      'scoringPlays' in unparsed &&
      Array.isArray(unparsed.scoringPlays) &&
      unparsed.scoringPlays.every(this._isIScoringPlayDTO) &&
      'network' in unparsed &&
      'teamIDHome' in unparsed &&
      'homeResult' in unparsed &&
      'away' in unparsed &&
      'lineScore' in unparsed &&
      this._isILineScoreDTO(unparsed.lineScore) &&
      'currentPeriod' in unparsed &&
      'gameLocation' in unparsed &&
      'home' in unparsed &&
      'playerStats' in unparsed &&
      this._isIPlayerMatchStatsDTO(unparsed.playerStats) &&
      'arenaCapacity' in unparsed &&
      'arena' in unparsed &&
      'homePts' in unparsed &&
      'awayResult' in unparsed &&
      'teamIDAway' in unparsed &&
      'gameClock' in unparsed &&
      'awayPts' in unparsed &&
      'gameID' in unparsed &&
      'seasonType' in unparsed &&
      'DST' in unparsed &&
      unparsed.DST !== null &&
      typeof unparsed.DST === 'object' &&
      'away' in unparsed.DST &&
      'home' in unparsed.DST &&
      this._isDstStatsDTO(unparsed.DST.away) &&
      this._isDstStatsDTO(unparsed.DST.home)
    ) {
      return true;
    }
    console.error(`7 ${unparsed}`);

    return false;
  }

  private static _isITeamStatsDTO(
    unparsed: unknown,
  ): unparsed is ITeamStatsDTO {
    if (
      typeof unparsed === 'object' &&
      unparsed !== null &&
      'totalYards' in unparsed &&
      'rushingAttempts' in unparsed &&
      'rushingYards' in unparsed &&
      'fumblesLost' in unparsed &&
      'penalties' in unparsed &&
      'totalPlays' in unparsed &&
      'possession' in unparsed &&
      'safeties' in unparsed &&
      'passCompletionsAndAttempts' in unparsed &&
      'passingFirstDowns' in unparsed &&
      'interceptionsThrown' in unparsed &&
      'sacksAndYardsLost' in unparsed &&
      'thirdDownEfficiency' in unparsed &&
      'yardsPerPlay' in unparsed &&
      'redZoneScoredAndAttempted' in unparsed &&
      'teamID' in unparsed &&
      'defensiveOrSpecialTeamsTds' in unparsed &&
      'totalDrives' in unparsed &&
      'rushingFirstDowns' in unparsed &&
      'firstDowns' in unparsed &&
      'team' in unparsed &&
      'teamAbv' in unparsed &&
      'firstDownsFromPenalties' in unparsed &&
      'fourthDownEfficiency' in unparsed &&
      'passingYards' in unparsed &&
      'yardsPerRush' in unparsed &&
      'turnovers' in unparsed &&
      'yardsPerPass' in unparsed
    ) {
      return true;
    }

    console.error(`2 ${unparsed}`);
    return false;
  }

  private static _isIScoringPlayDTO(
    unparsed: unknown,
  ): unparsed is IScoringPlayDTO {
    if (
      typeof unparsed === 'object' &&
      unparsed !== null &&
      'score' in unparsed &&
      'scorePeriod' in unparsed &&
      'homeScore' in unparsed &&
      'awayScore' in unparsed &&
      'teamID' in unparsed &&
      'scoreDetails' in unparsed &&
      'scoreType' in unparsed &&
      'scoreTime' in unparsed &&
      'team' in unparsed &&
      'playerIDs' in unparsed &&
      Array.isArray((unparsed as IScoringPlayDTO).playerIDs)
    ) {
      return true;
    }
    console.error(`3 ${unparsed}`);

    return false;
  }

  private static _isILineScoreDTO(
    unparsed: unknown,
  ): unparsed is ILineScoreDTO {
    if (
      typeof unparsed === 'object' &&
      unparsed !== null &&
      'period' in unparsed &&
      'gameClock' in unparsed &&
      'away' in unparsed &&
      typeof (unparsed as ILineScoreDTO).away === 'object' &&
      'Q1' in (unparsed as ILineScoreDTO).away &&
      'Q2' in (unparsed as ILineScoreDTO).away &&
      'Q3' in (unparsed as ILineScoreDTO).away &&
      'Q4' in (unparsed as ILineScoreDTO).away &&
      'teamID' in (unparsed as ILineScoreDTO).away &&
      'totalPts' in (unparsed as ILineScoreDTO).away &&
      'teamAbv' in (unparsed as ILineScoreDTO).away &&
      'home' in unparsed &&
      typeof (unparsed as ILineScoreDTO).home === 'object' &&
      'Q1' in (unparsed as ILineScoreDTO).home &&
      'Q2' in (unparsed as ILineScoreDTO).home &&
      'Q3' in (unparsed as ILineScoreDTO).home &&
      'Q4' in (unparsed as ILineScoreDTO).home &&
      'teamID' in (unparsed as ILineScoreDTO).home &&
      'totalPts' in (unparsed as ILineScoreDTO).home &&
      'teamAbv' in (unparsed as ILineScoreDTO).home
    ) {
      return true;
    }

    console.error(`4 ${unparsed}`);

    return false;
  }

  private static _isIPlayerMatchStatsDTO(
    unparsed: unknown,
  ): unparsed is IPlayerMatchStatsDTO {
    if (typeof unparsed !== 'object' || unparsed === null) return false;
    const playerStats: IPlayerMatchStatsDTO = unparsed as IPlayerMatchStatsDTO;
    for (const playerID in playerStats) {
      if (
        typeof playerStats[playerID] !== 'object' ||
        playerStats[playerID] === null ||
        !('gameID' in playerStats[playerID]) ||
        !('teamID' in playerStats[playerID]) ||
        !('team' in playerStats[playerID]) ||
        !('teamAbv' in playerStats[playerID]) ||
        !('longName' in playerStats[playerID]) ||
        !('fantasyPointsDefault' in playerStats[playerID])
      ) {
        console.error(`1 ${unparsed}`);
        return false;
      }
    }
    return true;
  }

  private static _isDstStatsDTO(unparsed: unknown): unparsed is IDstStatsDTO {
    if (
      typeof unparsed === 'object' &&
      unparsed !== null &&
      'teamAbv' in unparsed &&
      'teamID' in unparsed &&
      'defTD' in unparsed &&
      'defensiveInterceptions' in unparsed &&
      'sacks' in unparsed &&
      'ydsAllowed' in unparsed &&
      'fumblesRecovered' in unparsed &&
      'ptsAllowed' in unparsed &&
      'safeties' in unparsed
    ) {
      return true;
    } else {
      console.error(`5 ${unparsed}`);

      return false;
    }
  }
}
