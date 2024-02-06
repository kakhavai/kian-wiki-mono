import { PrismaClient } from '@prisma/client';
import PlayerFeedRepository from '../repositories/PlayerFeedRepository';
import { IPlayer } from 'football-feed-types';

describe('PlayerFeedRepository (Integration Tests)', () => {
  let prisma: PrismaClient;
  let repository: PlayerFeedRepository;
  let playerData: IPlayer;

  beforeAll(async () => {
    prisma = new PrismaClient();
    // Establish a connection to a test database
    await prisma.$connect();

    repository = new PlayerFeedRepository(prisma);

    playerData = {
      name: 'John Doe',
      birthDate: new Date('1990-01-01'),
      jerseyNumber: 10,
      position: 'K',
    };
  });

  afterAll(async () => {
    // Close the Prisma client and disconnect from the test database
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    // Initialize a new instance of PlayerFeedRepository for each test
  });

  test('Adds player to Player table', async () => {
    let addedPlayer: IPlayer | null = await repository.addPlayer(playerData);

    expect(addedPlayer).toEqual(expect.objectContaining(playerData));

    // You can also verify the player exists in the database if needed
    addedPlayer = await prisma.player.findUnique({
      where: { jerseyNumber: playerData.jerseyNumber },
    });
    expect(addedPlayer).toEqual(expect.objectContaining(playerData));
  });

  test('Get player from the Player table', async () => {
    const getPlayerData: IPlayer | undefined = await repository.getPlayer(
      playerData.jerseyNumber,
    );

    expect(getPlayerData).toEqual(expect.objectContaining(playerData));
  });

  test('Update a player in the Player table', async () => {
    const updatedPlayerData: IPlayer = {
      name: 'Brandon Aubrey',
      birthDate: new Date('1995-03-14'),
      jerseyNumber: 17,
      position: 'K',
    };

    let updatedPlayer: IPlayer = await repository.updatePlayer(
      playerData.jerseyNumber,
      updatedPlayerData,
    );

    expect(updatedPlayer).toEqual(expect.objectContaining(updatedPlayerData));

    updatedPlayer = await repository.updatePlayer(
      updatedPlayerData.jerseyNumber,
      playerData,
    );

    expect(updatedPlayer).toEqual(expect.objectContaining(playerData));
  });

  test('Remove player from player Player table', async () => {
    const deletedPlayer = await repository.deletePlayer(
      playerData.jerseyNumber,
    );
    expect(deletedPlayer).toEqual(expect.objectContaining(playerData));
  });
});
