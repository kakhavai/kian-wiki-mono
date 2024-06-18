import React from 'react';
import sectionStyles from '@/styles/Section.module.css';
import { FantasyChart } from './FantasyChart';

export const FantasyAbout: React.FC = () => {
  return (
    <div className={sectionStyles.sectionWrapper}>
      <section className={sectionStyles.section}>
        <h2>About This Data</h2>
        <p>
          This data is gathered from recent football games and processed using
          machine learning algorithms. Please note that this is an alpha version
          and the projections should not be taken too seriously. The data is
          updated every two days.
        </p>
      </section>
      <section className={sectionStyles.section}>
        <FantasyChart />
      </section>
    </div>
  );
};