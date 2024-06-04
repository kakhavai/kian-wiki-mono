'use client'; // Mark this file as a client component

import { Navbar } from '@/components/navbar/Navbar';
import { Projects } from '@/components/resume/Projects';
import styles from '@/styles/page.module.css';

const HomePage: React.FC = () => (
  <div className={styles.wrapper}>
    <Navbar />
    <Projects />
  </div>
);

export default HomePage;
