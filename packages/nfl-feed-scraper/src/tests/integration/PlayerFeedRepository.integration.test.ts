import PlayerFeedRepository from '../../repositories/PlayerFeedRepository';
import { IPlayer, ITeam } from 'nfl-feed-types';
import TeamFeedRepository from '../../repositories/TeamFeedRepository';
import { v4 as uuidv4 } from 'uuid';

describe('PlayerFeedRepository (Integration Tests)', () => {
  let repository: PlayerFeedRepository;
  let playerData: IPlayer;
  let teamData: ITeam;

  beforeAll(async () => {
    repository = new PlayerFeedRepository();

    playerData = {
      id: uuidv4(),
      name: 'John Doe',
      birthDate: new Date('1990-01-01'),
      jerseyNumber: 10,
      position: 'K',
      teamId: 'LAR',
    };

    teamData = {
      name: 'Los Angeles Rams',
      abv: 'LAR',
      wins: 15,
      losses: 0,
      pa: 300,
      pf: 500,
      tie: 0,
      city: 'Los Angeles',
    };

    await TeamFeedRepository.addTeam(teamData);
  });

  afterAll(async () => {
    await TeamFeedRepository.deleteTeam('LAR');
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
      playerData.id,
    );

    expect(getPlayerData).toEqual(expect.objectContaining(playerData));
  });

  test('Update a player in the Player table', async () => {
    const updatedPlayerData: IPlayer = {
      id: uuidv4(),
      name: 'Brandon Aubrey',
      birthDate: new Date('1995-03-14'),
      jerseyNumber: 17,
      position: 'K',
      teamId: 'LAR',
    };

    let updatedPlayer: IPlayer = await repository.updatePlayer(
      playerData.id,
      updatedPlayerData,
    );

    expect(updatedPlayer).toEqual(expect.objectContaining(updatedPlayerData));

    updatedPlayer = await repository.updatePlayer(
      updatedPlayerData.id,
      playerData,
    );

    expect(updatedPlayer).toEqual(expect.objectContaining(playerData));
  });

  test('Remove player from player Player table', async () => {
    const deletedPlayer = await repository.deletePlayer(playerData.id);
    expect(deletedPlayer).toEqual(expect.objectContaining(playerData));
  });
});
