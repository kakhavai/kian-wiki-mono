// components/Layout.tsx
import React, { ReactNode } from 'react';
import styles from '@/styles/Layout.module.css';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className={styles.container}>
    <header className={styles.header}>My Responsive Site</header>
    <main className={styles.main}>{children}</main>
    <footer className={styles.footer}>&copy; 2024 My Responsive Site</footer>
  </div>
);

export default Layout;
