// pages/index.tsx
import { Navbar } from '@/components/navbar/Navbar';
import { AboutMe } from '@/components/resume/AboutMe';
import styles from '@/styles/page.module.css';

export default function Home(): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <AboutMe />
    </div>
  );
}
