'use client'; // Mark this file as a client component

import { Navbar } from '@/components/navbar/Navbar';
import ResumeDetails from '@/components/resume/ResumeDetails';
import styles from '@/styles/page.module.css';

const HomePage: React.FC = () => (
  <div className={styles.wrapper}>
    <Navbar />
    <ResumeDetails />
  </div>
);

export default HomePage;
