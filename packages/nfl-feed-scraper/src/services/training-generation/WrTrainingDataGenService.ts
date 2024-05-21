import { IBoxScoreDTO } from '../../types/dto/box-score/IBoxScoreDTO';

export class WrTrainingDataGenService {
  public static generateWrTrainingData(
    boxScores: IBoxScoreDTO[],
    playerId: string,
  ): Array<Array<number>> {
    const results: Array<Array<number>> = [];

    for (const boxScore of boxScores) {
      const trainingData: number[] = this._getWrStats(boxScore, playerId);

      if (trainingData.length > 0) {
        results.push(trainingData);
      }
    }

    return results;
  }

  private static _getWrStats(
    boxScore: IBoxScoreDTO,
    playerId: string,
  ): number[] {
    if (!boxScore.playerStats?.[playerId]) {
      return [];
    }

    return [
      parseInt(boxScore.playerStats?.[playerId]?.Receiving?.receptions ?? '0'),
      parseInt(boxScore.playerStats?.[playerId]?.Receiving?.longRec ?? '0'),
      parseInt(boxScore.playerStats?.[playerId]?.Receiving?.recAvg ?? '0'),
      parseInt(boxScore.playerStats?.[playerId]?.Receiving?.recTD ?? '0'),
      parseInt(boxScore.playerStats?.[playerId]?.Receiving?.recYds ?? '0'),
      parseInt(boxScore.playerStats?.[playerId]?.Receiving?.targets ?? '0'),
      parseInt(boxScore.playerStats?.[playerId]?.Rushing?.carries ?? '0'),
      parseInt(boxScore.playerStats?.[playerId]?.Rushing?.longRush ?? '0'),
      parseInt(boxScore.playerStats?.[playerId]?.Rushing?.rushAvg ?? '0'),
      parseInt(boxScore.playerStats?.[playerId]?.Rushing?.rushTD ?? '0'),
      parseInt(boxScore.playerStats?.[playerId]?.Rushing?.rushYds ?? '0'),
    ];
  }
}
