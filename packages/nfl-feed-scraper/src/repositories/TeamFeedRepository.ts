import { ITeam, TeamNotFoundException } from 'nfl-feed-types';
import PrismaSingleton from '../prisma/PrismaSingleton';

class TeamFeedRepository {
  private _prisma: PrismaSingleton;

  public constructor() {
    this._prisma = PrismaSingleton.getInstance();
  }

  public async addTeam(teamData: ITeam): Promise<ITeam> {
    const team: ITeam = await this._prisma.team.create({
      data: teamData,
    });
    return team;
  }

  public async getTeam(abv: string): Promise<ITeam | undefined> {
    const team: ITeam | null = await this._prisma.team.findUnique({
      where: { abv },
    });

    if (!team) {
      throw new TeamNotFoundException(abv);
    }

    return team ? team : undefined;
  }

  public async updateTeam(abv: string, teamData: ITeam): Promise<ITeam> {
    const team: ITeam = await this._prisma.team.update({
      where: { abv },
      data: teamData,
    });
    return team;
  }

  public async deleteTeam(abv: string): Promise<ITeam> {
    const team: ITeam = await this._prisma.team.delete({
      where: { abv },
    });
    return team;
  }
}

export default TeamFeedRepository;
