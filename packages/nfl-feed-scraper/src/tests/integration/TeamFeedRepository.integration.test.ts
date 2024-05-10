import TeamFeedRepository from '../../repositories/TeamFeedRepository';
import { ITeam } from 'nfl-feed-types';

describe('TeamFeedRepository (Integration Tests)', () => {
  let teamData: ITeam;

  beforeAll(async () => {
    teamData = {
      name: 'Miami Dolphins',
      abv: 'MIA',
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
    const addedTeam: ITeam | null = await TeamFeedRepository.addTeam(teamData);

    expect(addedTeam).toEqual(expect.objectContaining(teamData));
  });

  test('Get team from the Team table', async () => {
    const getTeamData: ITeam | undefined = await TeamFeedRepository.getTeam(
      teamData.abv,
    );

    expect(getTeamData).toEqual(expect.objectContaining(teamData));
  });

  test('Update a team in the Team table', async () => {
    const updatedTeamData: ITeam = {
      name: 'Miami Dolphins',
      abv: 'MIA',
      wins: 20,
      losses: 0,
      pa: 100,
      pf: 500,
      tie: 0,
      city: 'Miami',
    };

    let updatedTeam: ITeam = await TeamFeedRepository.updateTeam(
      teamData.abv,
      updatedTeamData,
    );

    expect(updatedTeam).toEqual(expect.objectContaining(updatedTeamData));

    updatedTeam = await TeamFeedRepository.updateTeam(
      updatedTeamData.abv,
      teamData,
    );

    expect(updatedTeam).toEqual(expect.objectContaining(teamData));
  });

  test('Upsert a team in the Team table', async () => {
    const updatedTeamData: ITeam = {
      name: 'Miami Dolphins',
      abv: 'MIA',
      wins: 20,
      losses: 0,
      pa: 100,
      pf: 500,
      tie: 0,
      city: 'Miami',
    };

    let updatedTeam: ITeam =
      await TeamFeedRepository.upsertTeam(updatedTeamData);

    expect(updatedTeam).toEqual(expect.objectContaining(updatedTeamData));

    updatedTeam = await TeamFeedRepository.updateTeam(
      updatedTeamData.abv,
      teamData,
    );

    expect(updatedTeam).toEqual(expect.objectContaining(teamData));
  });

  test('Remove team from team Team table', async () => {
    const deletedTeam = await TeamFeedRepository.deleteTeam(teamData.abv);
    expect(deletedTeam).toEqual(expect.objectContaining(teamData));
  });

  test('bulkUpsertTeams', async () => {
    const teamsData: ITeam[] = [
      {
        name: 'Falcons',
        abv: 'ATL',
        wins: 5,
        losses: 3,
        pa: 150,
        pf: 170,
        tie: 0,
        city: 'Atlanta',
      },
      {
        name: 'Seahawks',
        abv: 'SEA',
        wins: 4,
        losses: 4,
        pa: 140,
        pf: 160,
        tie: 0,
        city: 'Seattle',
      },
    ];
    const result = await TeamFeedRepository.bulkUpsertTeams(teamsData);
    expect(result).toBe(true);
  });

  test('bulkDeleteMissing', async () => {
    const teamsData: ITeam[] = [
      {
        name: 'Falcons',
        abv: 'ATL',
        wins: 5,
        losses: 3,
        pa: 150,
        pf: 170,
        tie: 0,
        city: 'Atlanta',
      },
      {
        name: 'Seahawks',
        abv: 'SEA',
        wins: 4,
        losses: 4,
        pa: 140,
        pf: 160,
        tie: 0,
        city: 'Seattle',
      },
      {
        name: 'Miami Dolphins',
        abv: 'MIA',
        wins: 20,
        losses: 0,
        pa: 100,
        pf: 500,
        tie: 0,
        city: 'Miami',
      },
    ];
    const result = await TeamFeedRepository.bulkDeleteMissing(teamsData);
    expect(result).toBe(true);
  });
});
