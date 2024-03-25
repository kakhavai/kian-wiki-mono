import TeamFeedRepository from '../../repositories/TeamFeedRepository';
import { prismaMock } from '../../prisma/MockPrismaSingleton';
import { ITeam } from 'nfl-feed-types';
import { ITeamDAO } from '../../types/ITeamDAO';

describe('TeamFeedRepository (Integration Tests)', () => {
  let repository: TeamFeedRepository;
  let teamData: ITeam;
  let teamDataMock: ITeamDAO;

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

    teamDataMock = {
      id: 1, // Arbitrary mock value for id
      createdAt: new Date(), // Arbitrary mock value for createdAt
      ...teamData,
    };
  });

  afterAll(async () => {
    // Close the Prisma client and disconnect from the test database
  });

  beforeEach(async () => {
    // Initialize a new instance of TeamFeedRepository for each test
  });

  test('Adds team to Team table', async () => {
    prismaMock.team.create.mockResolvedValue(teamDataMock);

    const addedTeam: ITeam | null = await repository.addTeam(teamData);

    expect(addedTeam).toEqual(expect.objectContaining(teamData));
  });

  // test('Get team from the Team table', async () => {
  //   const getTeamData: ITeam | undefined = await repository.getTeam(
  //     teamData.abv,
  //   );

  //   expect(getTeamData).toEqual(expect.objectContaining(teamData));
  // });

  // test('Update a team in the Team table', async () => {
  //   const updatedTeamData: ITeam = {
  //     name: 'Miami Dolphins',
  //     abv: 'MIA',
  //     wins: 20,
  //     losses: 0,
  //     pa: 100,
  //     pf: 500,
  //     tie: 0,
  //     city: 'Miami',
  //   };

  //   let updatedTeam: ITeam = await repository.updateTeam(
  //     teamData.abv,
  //     updatedTeamData,
  //   );

  //   expect(updatedTeam).toEqual(expect.objectContaining(updatedTeamData));

  //   updatedTeam = await repository.updateTeam(updatedTeamData.abv, teamData);

  //   expect(updatedTeam).toEqual(expect.objectContaining(teamData));
  // });

  // test('Remove team from team Team table', async () => {
  //   const deletedTeam = await repository.deleteTeam(teamData.abv);
  //   expect(deletedTeam).toEqual(expect.objectContaining(teamData));
  // });
});
