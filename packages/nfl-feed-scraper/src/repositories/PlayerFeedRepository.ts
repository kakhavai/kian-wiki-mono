import { IPlayer, PlayerNotFoundException } from 'nfl-feed-types';
import PrismaSingleton from '../prisma/PrismaSingleton';

class PlayerFeedRepository {
  private _prisma: PrismaSingleton;

  public constructor() {
    this._prisma = PrismaSingleton.getInstance();
  }

  public async addPlayer(playerData: IPlayer): Promise<IPlayer> {
    const player: IPlayer = await this._prisma.player.create({
      data: playerData,
    });
    return player;
  }

  public async getPlayer(jerseyNumber: number): Promise<IPlayer | undefined> {
    const player: IPlayer | null = await this._prisma.player.findUnique({
      where: { jerseyNumber },
    });

    if (!player) {
      throw new PlayerNotFoundException(jerseyNumber);
    }

    return player ? player : undefined;
  }

  public async updatePlayer(
    jerseyNumber: number,
    playerData: IPlayer,
  ): Promise<IPlayer> {
    const player: IPlayer = await this._prisma.player.update({
      where: { jerseyNumber },
      data: playerData,
    });
    return player;
  }

  public async deletePlayer(jerseyNumber: number): Promise<IPlayer> {
    const player: IPlayer = await this._prisma.player.delete({
      where: { jerseyNumber },
    });
    return player;
  }
}

export default PlayerFeedRepository;
