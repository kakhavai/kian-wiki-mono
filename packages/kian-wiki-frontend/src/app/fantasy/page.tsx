import React from 'react';
import { fetchWrStats } from '@/app/stats/FetchWrStats';
import { FantasyChart } from '@/components/fantasy/FantasyChart';
import sectionStyles from '@/styles/Section.module.css';
import { IWrProjectionData } from 'nfl-feed-types';
import { IWRStatsResponse } from '@/types/IWrStatsResponse';
import FantasyAbout from '@/components/fantasy/FantasyAbout';

function formatTimestamp(lastUpdated: string): string {
  const now: Date = new Date(lastUpdated);
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'America/Los_Angeles', // PST time zone
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };
  return now.toLocaleString('en-US', options) + ` PST`;
}

export default async function FantasyPage(): Promise<React.JSX.Element> {
  const wrStatsResponse: IWRStatsResponse = await fetchWrStats();
  const wrProjectionData: IWrProjectionData[] = wrStatsResponse.stats;
  const lastUpdated: string = formatTimestamp(wrStatsResponse.lastUpdated);

  return (
    <div>
      <div className={sectionStyles.sectionWrapper}>
        <section className={sectionStyles.section}>
          <FantasyAbout lastUpdated={lastUpdated} />
        </section>
        <section className={sectionStyles.section}>
          <FantasyChart wrData={wrProjectionData} />
        </section>
      </div>
    </div>
  );
}
