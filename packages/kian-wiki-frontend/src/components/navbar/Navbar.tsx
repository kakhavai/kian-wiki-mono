'use client';

import styled, { Runtime, IStyledComponent } from 'styled-components';
import Link from 'next/link';
import { useState, FC, HTMLAttributes, ReactNode } from 'react';

// Define interface for NavLinks props
interface INavLinksProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  inColor?: string;
  children?: ReactNode;
}
// Define Nav component with explicit typing
const Nav: IStyledComponent<Runtime> = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #333;
  color: #fff;
  padding: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

// Define NavLinks component with explicit typing using INavLinksProps
const NavLinks: IStyledComponent<Runtime, INavLinksProps> = styled.div`
  display: flex;
  gap: 1rem;
  color: ${({ inColor }) => inColor};

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    display: ${({ open }) => (open ? 'flex' : 'none')};
  }
`;

// Define Hamburger component with explicit typing
const Hamburger: IStyledComponent<Runtime, INavLinksProps> = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
  }

  div {
    height: 3px;
    width: 25px;
    background: #fff;
    margin: 4px 0;
  }
`;

// Define Navbar component
export const Navbar: FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Nav>
      <h1>MySite</h1>
      <Hamburger onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </Hamburger>
      <NavLinks open={open}>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </NavLinks>
    </Nav>
  );
};
