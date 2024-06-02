// components/Section.tsx
import React from 'react';
import styles from '@/styles/Section.module.css';

interface ISectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<ISectionProps> = ({ title, children }) => (
  <section className={styles.sectionWrapper}>
    <h3>{title}</h3>
    {children}
  </section>
);

export default Section;
