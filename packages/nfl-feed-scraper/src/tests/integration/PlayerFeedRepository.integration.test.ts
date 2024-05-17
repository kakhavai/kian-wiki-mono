import PlayerFeedRepository from '../../repositories/PlayerFeedRepository';
import { IPlayer } from 'nfl-feed-types';
import TeamFeedRepository from '../../repositories/TeamFeedRepository';
import { testTeamData } from '../data/TestTeamData';
import { v4 as uuidv4 } from 'uuid';

describe('PlayerFeedRepository (Integration Tests)', () => {
  let repository: PlayerFeedRepository;
  let playerData: IPlayer;
  const teamRepo: TeamFeedRepository = new TeamFeedRepository();

  beforeAll(async () => {
    repository = new PlayerFeedRepository();

    playerData = {
      remoteId: uuidv4(),
      name: 'John Doe',
      birthDate: new Date('1990-01-01'),
      jerseyNumber: 10,
      position: 'K',
      teamId: 'LAR',
    };

    await teamRepo.bulkUpsert(testTeamData);
  });

  afterAll(async () => {
    // Close the Prisma client and disconnect from the test database
  });

  beforeEach(async () => {
    // Initialize a new instance of PlayerFeedRepository for each test
  });

  test('Adds player to Player table', async () => {
    const addedPlayer: IPlayer | null = await repository.addPlayer(playerData);

    expect(addedPlayer).toEqual(expect.objectContaining(playerData));
  });

  test('Get player from the Player table', async () => {
    const getPlayerData: IPlayer | undefined = await repository.getPlayer(
      playerData.remoteId,
    );

    expect(getPlayerData).toEqual(expect.objectContaining(playerData));
  });

  test('Update a player in the Player table', async () => {
    const updatedPlayerData: IPlayer = {
      remoteId: uuidv4(),
      name: 'Brandon Aubrey',
      birthDate: new Date('1995-03-14'),
      jerseyNumber: 17,
      position: 'K',
      teamId: 'LAR',
    };

    let updatedPlayer: IPlayer = await repository.updatePlayer(
      playerData.remoteId,
      updatedPlayerData,
    );

    expect(updatedPlayer).toEqual(expect.objectContaining(updatedPlayerData));

    updatedPlayer = await repository.updatePlayer(
      updatedPlayerData.remoteId,
      playerData,
    );

    expect(updatedPlayer).toEqual(expect.objectContaining(playerData));
  });

  test('Remove player from player Player table', async () => {
    const deletedPlayer = await repository.deletePlayer(playerData.remoteId);
    expect(deletedPlayer).toEqual(expect.objectContaining(playerData));
  });
});
