import { ITeam, TeamNotFoundException } from 'nfl-feed-types';
import prisma from '../prisma/PrismaSingleton';

class TeamFeedRepository {
  public static async addTeam(teamData: ITeam): Promise<ITeam> {
    const team: ITeam = await prisma.team.create({
      data: teamData,
    });
    return team;
  }

  public static async getTeam(abv: string): Promise<ITeam | undefined> {
    const team: ITeam | null = await prisma.team.findUnique({
      where: { abv },
    });

    if (!team) {
      throw new TeamNotFoundException(abv);
    }

    return team ? team : undefined;
  }

  public static async updateTeam(abv: string, teamData: ITeam): Promise<ITeam> {
    const team: ITeam = await prisma.team.update({
      where: { abv },
      data: teamData,
    });
    return team;
  }

  public static async upsertTeam(teamData: ITeam): Promise<ITeam> {
    const team: ITeam = await prisma.team.upsert({
      where: { abv: teamData.abv },
      update: teamData,
      create: teamData,
    });
    return team;
  }

  public static async deleteTeam(abv: string): Promise<ITeam> {
    const team: ITeam = await prisma.team.delete({
      where: { abv },
    });
    return team;
  }
}

export default TeamFeedRepository;
