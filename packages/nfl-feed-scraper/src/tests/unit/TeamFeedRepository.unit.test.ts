import { TeamFeedRepository } from '../../repositories/TeamFeedRepository';
import { prismaMock } from '../../prisma/MockPrismaSingleton';
import { ITeam } from 'nfl-feed-types';
import { ITeamDAO } from '../../types/dao/ITeamDAO';

describe('TeamFeedRepository (Unit Tests)', () => {
  let teamData: ITeam;
  let teamDataMock: ITeamDAO;
  const teamRepo: TeamFeedRepository = new TeamFeedRepository();

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

    teamDataMock = {
      id: '1', // Arbitrary mock value for id
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
    const addedTeam: ITeam | null = await teamRepo.addTeam(teamData);

    expect(addedTeam).toEqual(expect.objectContaining(teamData));
  });

  test('Fails to add team to Team table', async () => {
    prismaMock.team.create.mockRejectedValue(new Error());
    await expect(teamRepo.addTeam(teamData)).rejects.toThrow();
  });

  test('Get team from the Team table', async () => {
    prismaMock.team.findUnique.mockResolvedValue(teamDataMock);
    const getTeamData: ITeam | undefined = await teamRepo.getTeam(teamData.abv);

    expect(getTeamData).toEqual(expect.objectContaining(teamData));
  });

  test('Fails to get team from the Team table', async () => {
    prismaMock.team.findUnique.mockRejectedValue(new Error());
    await expect(teamRepo.getTeam(teamData.abv)).rejects.toThrow();
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

    const updatedTeamDataMock: ITeamDAO = {
      id: '1', // Arbitrary mock value for id
      createdAt: new Date(), // Arbitrary mock value for createdAt
      ...updatedTeamData,
    };

    prismaMock.team.update.mockResolvedValue(updatedTeamDataMock);

    const updatedTeam: ITeam = await teamRepo.updateTeam(
      teamData.abv,
      updatedTeamData,
    );

    expect(updatedTeam).toEqual(expect.objectContaining(updatedTeamData));
  });

  test('Fails to update a team in the Team table', async () => {
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

    prismaMock.team.update.mockRejectedValue(new Error());

    await expect(
      teamRepo.updateTeam(teamData.abv, updatedTeamData),
    ).rejects.toThrow();
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

    const updatedTeamDataMock: ITeamDAO = {
      id: '1', // Arbitrary mock value for id
      createdAt: new Date(), // Arbitrary mock value for createdAt
      ...updatedTeamData,
    };

    prismaMock.team.upsert.mockResolvedValue(updatedTeamDataMock);

    const updatedTeam: ITeam = await teamRepo.upsertTeam(updatedTeamData);

    expect(updatedTeam).toEqual(expect.objectContaining(updatedTeamData));
  });

  test('Fails to upsert a team in the Team table', async () => {
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

    prismaMock.team.update.mockRejectedValue(new Error());

    await expect(
      teamRepo.updateTeam(teamData.abv, updatedTeamData),
    ).rejects.toThrow();
  });

  test('Remove team from team Team table', async () => {
    prismaMock.team.delete.mockResolvedValue(teamDataMock);
    const deletedTeam: ITeam = await teamRepo.deleteTeam(teamData.abv);
    expect(deletedTeam).toEqual(expect.objectContaining(teamData));
  });

  test('Fails to remove a team from team Team table', async () => {
    prismaMock.team.delete.mockRejectedValue(new Error());
    await expect(teamRepo.deleteTeam(teamData.abv)).rejects.toThrow();
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
    prismaMock.$executeRawUnsafe.mockResolvedValue(1);
    const result = await teamRepo.bulkUpsert(teamsData);
    expect(prismaMock.$executeRawUnsafe).toHaveBeenCalled();
    expect(result).toBe(true);

    prismaMock.$executeRawUnsafe.mockRejectedValue(new Error('Mock error'));
    await expect(teamRepo.bulkUpsert(teamsData)).rejects.toThrow('Mock error');
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
    ];
    prismaMock.$executeRawUnsafe.mockResolvedValue(1);
    const result = await teamRepo.bulkDeleteMissing(teamsData);
    expect(prismaMock.$executeRawUnsafe).toHaveBeenCalled();
    expect(result).toBe(true);

    prismaMock.$executeRawUnsafe.mockRejectedValue(new Error('Mock error'));
    await expect(teamRepo.bulkDeleteMissing(teamsData)).rejects.toThrow(
      'Mock error',
    );
  });
});
