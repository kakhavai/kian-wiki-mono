'use client';

import React from 'react';
import { FantasyAbout } from '@/components/fantasy/FantasyAbout';
import { Navbar } from '@/components/navbar/Navbar';
import styles from '@/styles/page.module.css';

const FantasyPage: React.FC = () => (
  <div className={styles.wrapper}>
    <Navbar />
    <FantasyAbout />
  </div>
);

export default FantasyPage;
