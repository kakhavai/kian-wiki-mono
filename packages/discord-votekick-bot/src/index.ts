// src/index.ts
import { Client, GatewayIntentBits, CommandInteraction } from 'discord.js';
import { config } from './config';
import { deployCommands } from './deploy-commands';
import { counterManager } from './commands/votekick';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once('ready', () => {
  console.log('Discord bot is ready! 🤖');
});

client.on('guildCreate', async (guild) => {
  await deployCommands();
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;
  switch (commandName) {
    case 'votekick':
      await handleVotekick(interaction);
      break;
  }
});

async function handleVotekick(interaction: CommandInteraction) {
  const user = interaction.options.getUser('user');
  if (!user) {
    await interaction.reply('You must provide a valid user.');
    return;
  }

  const userId = user.id;
  // For demonstration, we'll increment the counter.
  await counterManager.increment(interaction, userId);
}

await client.login(config.DISCORD_TOKEN);
