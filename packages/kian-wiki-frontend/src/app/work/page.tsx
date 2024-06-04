'use client'; // Mark this file as a client component

import { Navbar } from '@/components/navbar/Navbar';
import { WorkExperience } from '@/components/resume/WorkExperience';
import styles from '@/styles/page.module.css';

const HomePage: React.FC = () => (
  <div className={styles.wrapper}>
    <Navbar />
    <WorkExperience />
  </div>
);

export default HomePage;
