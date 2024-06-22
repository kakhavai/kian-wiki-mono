'use client';

import React, {
  useState,
  useEffect,
  useRef,
  RefObject,
  MutableRefObject,
  useCallback,
} from 'react';
import NavLink from '@/components/navbar/NavLink';
import styles from '@/styles/Navbar.module.css';

export const Navbar: React.FC = () => {
  const [transform, setTransform] = useState<string>('');
  const [isTransforming, setIsTransforming] = useState<boolean>(false);
  const titleRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const timeoutRef: MutableRefObject<NodeJS.Timeout | null> =
    useRef<NodeJS.Timeout | null>(null);

  const resetTransform: () => void = useCallback((): void => {
    setTransform('');
    setIsTransforming(false);
  }, []);

  //Triggers on hover of title
  const handleMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void =
    useCallback(
      (e: React.MouseEvent<HTMLDivElement>): void => {
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
      },
      [isTransforming, resetTransform],
    );

  const handleTransitionEnd: () => void = useCallback((): void => {
    setIsTransforming(false);
  }, []);

  //When this occurs attach a transitionend listener to it when its done you can set transforming to false
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
  }, [handleTransitionEnd]);

  return (
    <nav className={styles.nav}>
      <div
        ref={titleRef}
        className={styles.webTitle}
        style={{ transform }}
        onMouseMove={handleMouseMove}
      >
        <NavLink
          href="/"
          className={`${styles.titleLink} ${styles.desktopOnly}`}
          name="kian.wiki"
        />
      </div>
      <div className={styles.navLinks}>
        <NavLink
          href="/"
          className={`${styles.styledLink} ${styles.mobileOnly}`}
          name="home"
        />
        <NavLink href="/work" className={styles.styledLink} name="work" />
        <NavLink
          href="/projects"
          className={styles.styledLink}
          name="projects"
        />
        <NavLink href="/fantasy" className={styles.styledLink} name="fantasy" />
      </div>
    </nav>
  );
};

export default Navbar;
