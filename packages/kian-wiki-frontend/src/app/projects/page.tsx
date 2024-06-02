'use client'; // Mark this file as a client component

import { Navbar } from '@/components/navbar/Navbar';
import ProjectSection from '@/components/resume/ProjectSection';
import styles from '@/styles/page.module.css';

const HomePage: React.FC = () => (
  <div className={styles.wrapper}>
    <Navbar />
    <ProjectSection />
  </div>
);

export default HomePage;
