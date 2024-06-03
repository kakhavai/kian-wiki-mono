// pages/index.tsx
import { Navbar } from '@/components/navbar/Navbar';
import { ResumeDetails } from '@/components/resume/ResumeDetails';
import styles from '@/styles/page.module.css';

export default function Home(): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <ResumeDetails />
    </div>
  );
}
