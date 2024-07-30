import { CommandInteraction } from 'discord.js';

interface IVotekickData {
  count: number;
  timeout: NodeJS.Timeout | undefined;
}

class CounterManager {
  private _voteCounters: Map<string, IVotekickData>;
  private readonly _timeoutDuration: number;

  public constructor(timeoutDuration: number) {
    this._voteCounters = new Map<string, IVotekickData>();
    this._timeoutDuration = timeoutDuration;
  }

  private _resetCounter(userId: string): void {
    const counterData: IVotekickData | undefined =
      this._voteCounters.get(userId);
    if (counterData) {
      counterData.count = 0;
      console.log(
        `Counter for user ID ${userId} reset to 0 due to inactivity.`,
      );
    }
  }

  private _startTimeout(userId: string): void {
    const counterData: IVotekickData | undefined =
      this._voteCounters.get(userId);
    if (counterData?.timeout) {
      clearTimeout(counterData.timeout);
    }

    const timeout: NodeJS.Timeout = setTimeout(() => {
      this._resetCounter(userId);
      this._voteCounters.set(userId, { ...counterData!, timeout: undefined });
    }, this._timeoutDuration);

    this._voteCounters.set(userId, { ...counterData!, timeout });
  }

  public async increment(
    interaction: CommandInteraction,
    userId: string,
  ): Promise<void> {
    let counterData: IVotekickData | undefined = this._voteCounters.get(userId);
    if (!counterData) {
      counterData = { count: 0, timeout: undefined };
    }
    counterData.count += 1;
    this._voteCounters.set(userId, counterData);

    await interaction.reply(
      `Counter for <@${userId}> incremented to ${counterData.count}`,
    );
    this._startTimeout(userId);
  }

  public async manualReset(
    interaction: CommandInteraction,
    userId: string,
  ): Promise<void> {
    let counterData: IVotekickData | undefined = this._voteCounters.get(userId);
    if (!counterData) {
      counterData = { count: 0, timeout: undefined };
    } else {
      counterData.count = 0;
    }
    if (counterData.timeout) {
      clearTimeout(counterData.timeout);
      counterData.timeout = undefined;
    }
    this._voteCounters.set(userId, counterData);

    await interaction.reply(`Counter for <@${userId}> manually reset to 0.`);
  }

  public async getCount(
    interaction: CommandInteraction,
    userId: string,
  ): Promise<void> {
    const counterData: IVotekickData = this._voteCounters.get(userId) || {
      count: 0,
      timeout: undefined,
    };
    await interaction.reply(
      `Current counter value for <@${userId}> is ${counterData.count}`,
    );
  }
}

// Instantiate a CounterManager object with a 2-hour timeout
export const counterManager: CounterManager = new CounterManager(
  2 * 60 * 60 * 1000,
);
