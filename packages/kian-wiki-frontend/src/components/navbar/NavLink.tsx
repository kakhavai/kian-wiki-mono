'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { INavLinkProps } from '@/types/INavLinkProps';
import styles from '@/styles/Navbar.module.css';

const NavLink: React.FC<INavLinkProps> = ({ href, className = '', name }) => {
  const pathname: string = usePathname();
  const isActive: boolean = pathname === href;

  return (
    <Link
      href={href}
      className={`${className} ${isActive ? styles.active : ''}`}
    >
      <span>{name}</span>
    </Link>
  );
};

export default NavLink;
