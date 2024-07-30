// src/deploy-commands.ts
import {
  REST,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  Routes,
  SlashCommandBuilder,
} from 'discord.js';
import { config } from './config';

const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [
  new SlashCommandBuilder()
    .setName('votekick')
    .setDescription('Initiate a vote to kick a user.')
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription('The user to be vote kicked.')
        .setRequired(true),
    ),
].map((command) => command.toJSON());

const rest: REST = new REST({ version: '10' }).setToken(config.DISCORD_TOKEN);

export async function deployCommands(): Promise<void> {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(config.CLIENT_ID, config.GUILD_ID),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
}
