import { S3FileUtil } from 'common-utils';
import { ScheduleDataService } from '../data-fetching/ScheduleDataService';
import { IMatch } from 'nfl-feed-types';
import { BoxScoreDataService } from '../data-fetching/BoxScoreDataService';
import { IBoxScoreDTO } from '../../types/dto/box-score/IBoxScoreDTO';
import { WrTrainingDataGenService } from './WrTrainingDataGenService';

const MAX_REGULAR_SEASON: number = 18;
const MAX_POST_SEASON: number = 4;

export class TrainingOrchestratorService {
  private _fileUtil: S3FileUtil = new S3FileUtil(
    process.env.NFL_SCRAPE_BUCKET_REGION!,
  );
  public async generateTrainingData(playerId: string): Promise<void> {
    const boxScores: IBoxScoreDTO[] = await this._pullRelevantBoxScores();
    const wrResult: Array<Array<number>> =
      await WrTrainingDataGenService.generateWrTrainingData(
        boxScores,
        playerId,
      );
    await this._fileUtil.uploadFile(
      process.env.NFL_SCRAPE_BUCKET_NAME!,
      `${playerId}.wr.trainingdata`,
      JSON.stringify(wrResult),
    );
  }
  private async _pullRelevantBoxScores(): Promise<IBoxScoreDTO[]> {
    const boxScores: IBoxScoreDTO[] = [];
    const missingMatches: IMatch[] = await this._getCompleteWeeks();

    for (const match of missingMatches) {
      const boxScore: IBoxScoreDTO = await BoxScoreDataService.fetchGameDetails(
        match.gameId,
        false,
      );

      boxScores.push(boxScore);
    }

    return boxScores;
  }

  private async _getCompleteWeeks(): Promise<IMatch[]> {
    let result: IMatch[] = [];

    let curWeek: number = 1;
    let curSeason: number = 2023;
    let curSeasonType: string = 'reg';

    let stopCount: number = 3;

    // if (this._checkTrainingSetHasValues(trainingSet)) {
    //   curWeek = trainingSet[trainingSet.length - 1].week + 1;
    //   curSeason = trainingSet[trainingSet.length - 1].season;
    //   curSeasonType = trainingSet[trainingSet.length - 1].seasonType;
    // }

    let validWeek: boolean = true;

    while (validWeek) {
      console.log(curSeason, curWeek, curSeasonType);
      if (curSeasonType === 'post' && curWeek > MAX_POST_SEASON) {
        curSeason++;
        curWeek = 1;
        curSeasonType = 'reg';
      } else if (curSeasonType === 'reg' && curWeek > MAX_REGULAR_SEASON) {
        curWeek = 1;
        curSeasonType = 'post';
      }

      const matches: IMatch[] = await ScheduleDataService.fetchWeekMatches(
        curWeek.toString(),
        curSeasonType,
        curSeason.toString(),
      );

      validWeek = this._checkAllWeeklyGamesComplete(matches);

      if (validWeek) {
        result = result.concat(matches);
      }
      curWeek++;
      stopCount--;

      if (stopCount < 0) break;
    }

    return result;
  }

  private _checkAllWeeklyGamesComplete(matches: IMatch[]): boolean {
    if (matches.length === 0) {
      return false;
    }

    for (const match of matches) {
      if (!match.gameStatus.toLowerCase().includes('final')) {
        return false;
      }
    }

    return true;
  }
}
