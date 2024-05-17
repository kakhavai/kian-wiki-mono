import TeamFeedRepository from '../../repositories/TeamFeedRepository';
import { testTeamData } from '../data/TestTeamData';
import { ITeam } from 'nfl-feed-types';

describe('TeamFeedRepository (Integration Tests)', () => {
  let teamData: ITeam;

  const teamRepo: TeamFeedRepository = new TeamFeedRepository();

  beforeAll(async () => {
    teamData = {
      name: 'Miami DolphinsX',
      abv: 'MIAX',
      wins: 15,
      losses: 0,
      pa: 300,
      pf: 500,
      tie: 0,
      city: 'Miami',
    };
  });

  afterAll(async () => {
    // Close the Prisma client and disconnect from the test database
  });

  beforeEach(async () => {
    // Initialize a new instance of TeamFeedRepository for each test
  });

  test('Adds team to Team table', async () => {
    const addedTeam: ITeam | null = await teamRepo.addTeam(teamData);

    expect(addedTeam).toEqual(expect.objectContaining(teamData));
  });

  test('Get team from the Team table', async () => {
    const getTeamData: ITeam | undefined = await teamRepo.getTeam(teamData.abv);

    expect(getTeamData).toEqual(expect.objectContaining(teamData));
  });

  test('Update a team in the Team table', async () => {
    const updatedTeamData: ITeam = {
      name: 'Miami DolphinsX',
      abv: 'MIAX',
      wins: 20,
      losses: 0,
      pa: 100,
      pf: 500,
      tie: 0,
      city: 'Miami',
    };

    let updatedTeam: ITeam = await teamRepo.updateTeam(
      teamData.abv,
      updatedTeamData,
    );

    expect(updatedTeam).toEqual(expect.objectContaining(updatedTeamData));

    updatedTeam = await teamRepo.updateTeam(updatedTeamData.abv, teamData);

    expect(updatedTeam).toEqual(expect.objectContaining(teamData));
  });

  test('Upsert a team in the Team table', async () => {
    const updatedTeamData: ITeam = {
      name: 'Miami DolphinsX',
      abv: 'MIAX',
      wins: 20,
      losses: 0,
      pa: 100,
      pf: 500,
      tie: 0,
      city: 'Miami',
    };

    let updatedTeam: ITeam = await teamRepo.upsertTeam(updatedTeamData);

    expect(updatedTeam).toEqual(expect.objectContaining(updatedTeamData));

    updatedTeam = await teamRepo.updateTeam(updatedTeamData.abv, teamData);

    expect(updatedTeam).toEqual(expect.objectContaining(teamData));
  });

  test('Remove team from team Team table', async () => {
    const deletedTeam = await teamRepo.deleteTeam(teamData.abv);
    expect(deletedTeam).toEqual(expect.objectContaining(teamData));
  });

  test('bulkUpsertTeams', async () => {
    const teamsData: ITeam[] = [
      {
        name: 'FalconsX',
        abv: 'ZZZ',
        wins: 5,
        losses: 3,
        pa: 150,
        pf: 170,
        tie: 0,
        city: 'Atlanta',
      },
      {
        name: 'SeahawksX',
        abv: 'XXX',
        wins: 4,
        losses: 4,
        pa: 140,
        pf: 160,
        tie: 0,
        city: 'Seattle',
      },
      ...testTeamData,
    ];
    const result = await teamRepo.bulkUpsert(teamsData);
    expect(result).toBe(true);
  });

  test('bulkDeleteMissing', async () => {
    const teamsData: ITeam[] = testTeamData;
    const result = await teamRepo.bulkDeleteMissing(teamsData);
    expect(result).toBe(true);
  });
});
