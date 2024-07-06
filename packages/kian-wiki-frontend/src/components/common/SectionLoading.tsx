import React from 'react';
import sectionStyles from '@/styles/Section.module.css';

export const SectionLoading: React.FC = () => {
  return (
    <div className={sectionStyles.sectionWrapper}>
      <section className={sectionStyles.section}>
        <div>Loading...</div>
      </section>
    </div>
  );
};
