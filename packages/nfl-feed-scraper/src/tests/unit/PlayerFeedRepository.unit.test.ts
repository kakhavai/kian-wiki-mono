import PlayerFeedRepository from '../../repositories/PlayerFeedRepository';
import { prismaMock } from '../../prisma/MockPrismaSingleton';
import { IPlayer } from 'nfl-feed-types';
import { IPlayerDAO } from '../../types/dao/IPlayerDAO';

describe('PlayerFeedRepository (Unit Tests)', () => {
  let repository: PlayerFeedRepository;
  let playerData: IPlayer;
  let playerDataMock: IPlayerDAO;

  beforeAll(async () => {
    repository = new PlayerFeedRepository();

    playerData = {
      name: 'John Doe',
      birthDate: new Date('1990-01-01'),
      jerseyNumber: 10,
      position: 'K',
      teamId: 'LAR',
    };

    playerDataMock = {
      id: 1, // Arbitrary mock value for id
      createdAt: new Date(), // Arbitrary mock value for createdAt
      ...playerData,
    };
  });

  afterAll(async () => {
    // Close the Prisma client and disconnect from the test database
  });

  beforeEach(async () => {
    // Initialize a new instance of PlayerFeedRepository for each test
  });

  test('Adds player to Player table', async () => {
    prismaMock.player.create.mockResolvedValue(playerDataMock);
    const addedPlayer: IPlayer | null = await repository.addPlayer(playerData);

    expect(addedPlayer).toEqual(expect.objectContaining(playerData));
  });

  test('Fail to add player to Player table', async () => {
    prismaMock.player.create.mockRejectedValue(new Error());
    await expect(repository.addPlayer(playerData)).rejects.toThrow();
  });

  test('Get player from the Player table', async () => {
    prismaMock.player.findUnique.mockResolvedValue(playerDataMock);
    const getPlayerData: IPlayer | undefined = await repository.getPlayer(
      playerData.jerseyNumber,
    );

    expect(getPlayerData).toEqual(expect.objectContaining(playerData));
  });

  test('Fail to get player from the Player table', async () => {
    prismaMock.player.findUnique.mockRejectedValue(new Error());
    await expect(
      repository.getPlayer(playerData.jerseyNumber),
    ).rejects.toThrow();
  });

  test('Update a player in the Player table', async () => {
    const updatedPlayerData: IPlayer = {
      name: 'Brandon Aubrey',
      birthDate: new Date('1995-03-14'),
      jerseyNumber: 17,
      position: 'K',
      teamId: 'LAR',
    };

    const updatedPlayerDataMock: IPlayerDAO = {
      id: 1,
      createdAt: new Date(),
      ...updatedPlayerData,
    };

    prismaMock.player.update.mockResolvedValue(updatedPlayerDataMock);

    const updatedPlayer: IPlayer = await repository.updatePlayer(
      playerData.jerseyNumber,
      updatedPlayerData,
    );

    expect(updatedPlayer).toEqual(expect.objectContaining(updatedPlayerData));
  });

  test('Fail to update a player in the Player table', async () => {
    const updatedPlayerData: IPlayer = {
      name: 'Brandon Aubrey',
      birthDate: new Date('1995-03-14'),
      jerseyNumber: 17,
      position: 'K',
      teamId: 'LAR',
    };

    prismaMock.player.update.mockRejectedValue(new Error());

    await expect(
      repository.updatePlayer(playerData.jerseyNumber, updatedPlayerData),
    ).rejects.toThrow();
  });

  test('Remove player from player Player table', async () => {
    prismaMock.player.delete.mockResolvedValue(playerDataMock);

    const deletedPlayer = await repository.deletePlayer(
      playerData.jerseyNumber,
    );
    expect(deletedPlayer).toEqual(expect.objectContaining(playerData));
  });

  test('Fail to remove player from player Player table', async () => {
    prismaMock.player.delete.mockRejectedValue(new Error());

    await expect(
      repository.deletePlayer(playerData.jerseyNumber),
    ).rejects.toThrow();
  });
});
