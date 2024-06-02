'use client'; // Mark this file as a client component

import { Navbar } from '@/components/navbar/Navbar';
import WorkExperienceSection from '@/components/resume/WorkExperienceSection';
import styles from '@/styles/page.module.css';

const HomePage: React.FC = () => (
  <div className={styles.wrapper}>
    <Navbar />
    <WorkExperienceSection />
  </div>
);

export default HomePage;
