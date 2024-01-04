import { PrismaClient } from '@prisma/client';
import PlayerFeedRepository from '../repositories/PlayerFeedRepository';
import { IPlayer } from 'football-feed-types';

describe('PlayerFeedRepository (Integration Tests)', () => {
  let prisma: PrismaClient;
  let repository: PlayerFeedRepository;

  beforeAll(async () => {
    prisma = new PrismaClient();
    // Establish a connection to a test database
    await prisma.$connect();
  });

  afterAll(async () => {
    // Close the Prisma client and disconnect from the test database
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    // Initialize a new instance of PlayerFeedRepository for each test
    repository = new PlayerFeedRepository(prisma);
  });

  it('should add a player to the database', async () => {
    const playerData: IPlayer = {
      name: 'John Doe',
      birthDate: new Date('1990-01-01'),
      jerseyNumber: 10,
      position: 'K',
    };

    const addedPlayer = await repository.addPlayer(playerData);

    expect(addedPlayer).toEqual(expect.objectContaining(playerData));

    // You can also verify the player exists in the database if needed
    const dbPlayer = await prisma.player.findUnique({
      where: { jerseyNumber: playerData.jerseyNumber },
    });
    expect(dbPlayer).toEqual(expect.objectContaining(playerData));
  });

  // Write similar tests for other repository methods like getPlayer, updatePlayer, and deletePlayer
});
