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

  public static async bulkUpsertTeams(
    teamData: Array<ITeam>,
  ): Promise<boolean> {
    const values: string = teamData
      .map(
        (team) =>
          `('${team.name}', '${team.abv}', ${team.wins}, ${team.losses}, ${team.pa}, ${team.pf}, ${team.tie}, '${team.city}')`,
      )
      .join(', ');

    const query: string = `
      INSERT INTO "Team" (name, abv, wins, losses, pa, pf, tie, city)
      VALUES ${values}
      ON CONFLICT (abv) DO UPDATE SET
        name = EXCLUDED.name,
        wins = EXCLUDED.wins,
        losses = EXCLUDED.losses,
        pa = EXCLUDED.pa,
        pf = EXCLUDED.pf,
        tie = EXCLUDED.tie,
        city = EXCLUDED.city;
    `;

    try {
      await prisma.$executeRawUnsafe(query);
      console.log('TeamFeedRepository: Bulk upserted teams');
      return true;
    } catch (error) {
      console.error(
        'TeamFeedRepository: Error inserting/updating teams:',
        error,
      );

      console.error(query);
      return false;
    }
  }

  public static async bulkDeleteMissing(
    teamData: Array<ITeam>,
  ): Promise<boolean> {
    // Construct the list of values to be retained
    const values: string = teamData
      .map(
        (team) =>
          `('${team.name}', '${team.abv}', ${team.wins}, ${team.losses}, ${team.pa}, ${team.pf}, ${team.tie}, '${team.city}')`,
      )
      .join(', ');

    // SQL query that sets up a CTE with the desired data and deletes rows that do not match
    const query: string = `
      WITH retained_data (name, abv, wins, losses, pa, pf, tie, city) AS (
        VALUES ${values}
      )
      DELETE FROM "Team"
      WHERE NOT EXISTS (
        SELECT 1 FROM retained_data WHERE retained_data.abv = "Team".abv
      );
    `;

    try {
      // Executes the deletion query
      await prisma.$executeRawUnsafe(query);
      console.log('TeamFeedRepository: Rows deleted');
      return true;
    } catch (error) {
      console.error('TeamFeedRepository: Error deleting teams:', error);
      return false;
    }
  }
}

export default TeamFeedRepository;
