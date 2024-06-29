import React from 'react';
import sectionStyles from '@/styles/Section.module.css';
import { FantasyChart } from './FantasyChart';

function fetchTime(): string {
  const now: Date = new Date();
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

export const FantasyAbout: React.FC = () => {
  const lastUpdate: string = fetchTime();

  return (
    <div className={sectionStyles.sectionWrapper}>
      <section className={sectionStyles.section}>
        <h2>About This Data</h2>
        <p>
          This data is gathered from recent football games and processed using
          machine learning algorithms. Please note that this is an alpha version
          and the projections should not be taken too seriously. The data was
          last updated {lastUpdate}.
        </p>
      </section>
      <section className={sectionStyles.section}>
        <FantasyChart />
      </section>
    </div>
  );
};
