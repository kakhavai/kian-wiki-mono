'use client'; // Mark this file as a client component

import { Navbar } from '@/components/navbar/Navbar';
import { AboutMe } from '@/components/resume/AboutMe';
import styles from '@/styles/page.module.css';

const HomePage: React.FC = () => (
  <div className={styles.wrapper}>
    <Navbar />
    <AboutMe />
  </div>
);

export default HomePage;
