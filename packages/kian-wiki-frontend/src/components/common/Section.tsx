import React, { ReactNode } from 'react';
import styles from '@/styles/Section.module.css';

interface ISectionProps {
  title: string | ReactNode;
  children: React.ReactNode;
}

const Section: React.FC<ISectionProps> = ({ title, children }) => (
  <section className={styles.section}>
    {(typeof title === 'string' ? title.length > 0 : true) && <h3>{title}</h3>}
    {children}
  </section>
);

export default Section;
