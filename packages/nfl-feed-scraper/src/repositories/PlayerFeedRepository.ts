import { IPlayer, PlayerNotFoundException } from 'nfl-feed-types';
import prisma from '../prisma/PrismaSingleton';

class PlayerFeedRepository {
  public async addPlayer(playerData: IPlayer): Promise<IPlayer> {
    const player: IPlayer = await prisma.player.create({
      data: playerData,
    });
    return player;
  }

  public async getPlayer(id: string): Promise<IPlayer | undefined> {
    const player: IPlayer | null = await prisma.player.findUnique({
      where: { id },
    });

    if (!player) {
      throw new PlayerNotFoundException(id);
    }

    return player ? player : undefined;
  }

  public async updatePlayer(id: string, playerData: IPlayer): Promise<IPlayer> {
    const player: IPlayer = await prisma.player.update({
      where: { id },
      data: playerData,
    });
    return player;
  }

  public async deletePlayer(id: string): Promise<IPlayer> {
    const player: IPlayer = await prisma.player.delete({
      where: { id },
    });
    return player;
  }
}

export default PlayerFeedRepository;
