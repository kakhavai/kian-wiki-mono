import { IPlayer, PlayerNotFoundException } from 'nfl-feed-types';
import prisma from '../prisma/PrismaSingleton';
import BaseRepository from './BaseRepository';

class PlayerFeedRepository extends BaseRepository<IPlayer> {
  public constructor() {
    super('Player', 'remoteId', [
      'remoteId',
      'name',
      'birthDate',
      'jerseyNumber',
      'position',
      'teamId',
    ]);
  }

  public async addPlayer(playerData: IPlayer): Promise<IPlayer> {
    const player: IPlayer = await prisma.player.create({
      data: playerData,
    });
    return player;
  }

  public async getPlayer(remoteId: string): Promise<IPlayer | undefined> {
    const player: IPlayer | null = await prisma.player.findUnique({
      where: { remoteId },
    });

    if (!player) {
      throw new PlayerNotFoundException(remoteId);
    }

    return player ? player : undefined;
  }

  public async updatePlayer(
    remoteId: string,
    playerData: IPlayer,
  ): Promise<IPlayer> {
    const player: IPlayer = await prisma.player.update({
      where: { remoteId },
      data: playerData,
    });
    return player;
  }

  public async deletePlayer(remoteId: string): Promise<IPlayer> {
    const player: IPlayer = await prisma.player.delete({
      where: { remoteId },
    });
    return player;
  }
}

export default PlayerFeedRepository;
