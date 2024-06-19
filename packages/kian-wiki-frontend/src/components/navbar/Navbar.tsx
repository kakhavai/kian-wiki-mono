// components/navbar/Navbar.tsx
'use client';

import React, {
  useState,
  useEffect,
  useRef,
  RefObject,
  MutableRefObject,
} from 'react';
import Link from 'next/link';
import styles from '@/styles/Navbar.module.css';

export const Navbar: React.FC = () => {
  const [transform, setTransform] = useState<string>('');
  const [isTransforming, setIsTransforming] = useState<boolean>(false);
  const titleRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const timeoutRef: MutableRefObject<NodeJS.Timeout | null> =
    useRef<NodeJS.Timeout | null>(null);

  const resetTransform = (): void => {
    setTransform('');
    setIsTransforming(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!titleRef.current || isTransforming) return;

    const rect: DOMRect = titleRef.current.getBoundingClientRect();
    const x: number = e.clientX - (rect.left + rect.width / 2);
    const y: number = e.clientY - (rect.top + rect.height / 2);

    const distance: number = Math.sqrt(x * x + y * y);
    const maxDistance: number = 50;
    const moveX: number = -(x / distance) * Math.min(distance, maxDistance);
    const moveY: number = -(y / distance) * Math.min(distance, maxDistance);

    setTransform(
      `translate(${moveX}px, ${moveY}px) scale(${
        1 - Math.min(distance, maxDistance) / 200
      })`,
    );
    setIsTransforming(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(resetTransform, 3000);
  };

  const handleTransitionEnd = (): void => {
    setIsTransforming(false);
  };

  useEffect(() => {
    const currentRef: HTMLDivElement | null = titleRef.current;
    if (currentRef) {
      currentRef.addEventListener('transitionend', handleTransitionEnd);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('transitionend', handleTransitionEnd);
      }
    };
  }, []);

  return (
    <nav className={styles.nav}>
      <div
        ref={titleRef}
        className={styles.webTitle}
        style={{ transform }}
        onMouseMove={handleMouseMove}
      >
        <Link href="/" className={`${styles.titleLink} ${styles.desktopOnly} `}>
          <span className={styles.desktopTitle}>kian.wiki</span>
        </Link>
      </div>
      <div className={styles.navLinks}>
        <Link href="/" className={`${styles.styledLink} ${styles.mobileOnly}`}>
          <span>home</span>
        </Link>
        <Link href="/work" className={styles.styledLink}>
          <span>work</span>
        </Link>
        <Link href="/projects" className={styles.styledLink}>
          <span>projects</span>
        </Link>
        <Link href="/fantasy" className={styles.styledLink}>
          <span>fantasy</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
