import TeamFeedRepository from '../../repositories/TeamFeedRepository';
import { prismaMock } from '../../prisma/MockPrismaSingleton';
import { ITeam } from 'nfl-feed-types';
import { ITeamDAO } from '../../types/dao/ITeamDAO';

describe('TeamFeedRepository (Unit Tests)', () => {
  let teamData: ITeam;
  let teamDataMock: ITeamDAO;

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
    const addedTeam: ITeam | null = await TeamFeedRepository.addTeam(teamData);

    expect(addedTeam).toEqual(expect.objectContaining(teamData));
  });

  test('Fails to add team to Team table', async () => {
    prismaMock.team.create.mockRejectedValue(new Error());
    await expect(TeamFeedRepository.addTeam(teamData)).rejects.toThrow();
  });

  test('Get team from the Team table', async () => {
    prismaMock.team.findUnique.mockResolvedValue(teamDataMock);
    const getTeamData: ITeam | undefined = await TeamFeedRepository.getTeam(
      teamData.abv,
    );

    expect(getTeamData).toEqual(expect.objectContaining(teamData));
  });

  test('Fails to get team from the Team table', async () => {
    prismaMock.team.findUnique.mockRejectedValue(new Error());
    await expect(TeamFeedRepository.getTeam(teamData.abv)).rejects.toThrow();
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

    const updatedTeam: ITeam = await TeamFeedRepository.updateTeam(
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
      TeamFeedRepository.updateTeam(teamData.abv, updatedTeamData),
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

    const updatedTeam: ITeam =
      await TeamFeedRepository.upsertTeam(updatedTeamData);

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
      TeamFeedRepository.updateTeam(teamData.abv, updatedTeamData),
    ).rejects.toThrow();
  });

  test('Remove team from team Team table', async () => {
    prismaMock.team.delete.mockResolvedValue(teamDataMock);
    const deletedTeam: ITeam = await TeamFeedRepository.deleteTeam(
      teamData.abv,
    );
    expect(deletedTeam).toEqual(expect.objectContaining(teamData));
  });

  test('Fails to remove a team from team Team table', async () => {
    prismaMock.team.delete.mockRejectedValue(new Error());
    await expect(TeamFeedRepository.deleteTeam(teamData.abv)).rejects.toThrow();
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
    let result = await TeamFeedRepository.bulkUpsertTeams(teamsData);
    expect(prismaMock.$executeRawUnsafe).toHaveBeenCalled();
    expect(result).toBe(true);

    prismaMock.$executeRawUnsafe.mockRejectedValue(new Error('Mock error'));
    result = await TeamFeedRepository.bulkUpsertTeams(teamsData);
    expect(prismaMock.$executeRawUnsafe).toHaveBeenCalled();
    expect(result).toBe(false);
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
    let result = await TeamFeedRepository.bulkDeleteMissing(teamsData);
    expect(prismaMock.$executeRawUnsafe).toHaveBeenCalled();
    expect(result).toBe(true);

    prismaMock.$executeRawUnsafe.mockRejectedValue(new Error('Mock error'));
    result = await TeamFeedRepository.bulkDeleteMissing(teamsData);
    expect(prismaMock.$executeRawUnsafe).toHaveBeenCalled();
    expect(result).toBe(false);
  });
});
