import TeamFeedRepository from '../repositories/TeamFeedRepository';
import { ITeam } from 'nfl-feed-types';

describe('TeamFeedRepository (Integration Tests)', () => {
  let repository: TeamFeedRepository;
  let teamData: ITeam;

  beforeAll(async () => {
    repository = new TeamFeedRepository();

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
    const addedTeam: ITeam | null = await repository.addTeam(teamData);

    expect(addedTeam).toEqual(expect.objectContaining(teamData));
  });

  test('Get team from the Team table', async () => {
    const getTeamData: ITeam | undefined = await repository.getTeam(
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

    let updatedTeam: ITeam = await repository.updateTeam(
      teamData.abv,
      updatedTeamData,
    );

    expect(updatedTeam).toEqual(expect.objectContaining(updatedTeamData));

    updatedTeam = await repository.updateTeam(updatedTeamData.abv, teamData);

    expect(updatedTeam).toEqual(expect.objectContaining(teamData));
  });

  test('Remove team from team Team table', async () => {
    const deletedTeam = await repository.deleteTeam(teamData.abv);
    expect(deletedTeam).toEqual(expect.objectContaining(teamData));
  });
});
