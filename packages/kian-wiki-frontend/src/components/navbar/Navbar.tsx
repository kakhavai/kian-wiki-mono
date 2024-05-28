'use client';

import styled, { Runtime, IStyledComponent } from 'styled-components';
import Link from 'next/link';
import { FC, HTMLAttributes, ReactNode } from 'react';

// Define interface for NavLinks props
interface INavLinksProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  inColor?: string;
  children?: ReactNode;
  href?: string;
}

const WebTitle: IStyledComponent<Runtime> = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #333;
  color: #fff;
  padding: 1rem;

  /* @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 0rem;
  } */
`;

const TitleText: IStyledComponent<Runtime, INavLinksProps> = styled.div`
  font-size: 1.5em; // Similar to h1 font-size
  font-weight: bold; // Similar to h1 font-weight
  margin: 0; // Reset default margin

  @media (max-width: 428px) {
    display: none; // Hide the title text when screen width is less than 768px
  }
`;

const Nav: IStyledComponent<Runtime> = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #333;
  color: #fff;
  padding: 1rem;

  /* @media (max-width: 768px) {
     flex-direction: column; 
     align-items: flex-start; 
  } */
`;

// Define a styled component for the glowing links
const StyledLink: IStyledComponent<Runtime, INavLinksProps> = styled(Link)`
  position: relative;
  padding: 0.5rem 1rem;
  color: ${({ inColor }) => inColor || '#fff'};
  text-decoration: none;
  overflow: hidden;
  transition: color 0.3s;
  border-radius: 5px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 10px; // Adjust this value to increase roundness
    opacity: 0;
    transition:
      opacity 0.3s,
      box-shadow 0.3s; // Add box-shadow transition
    z-index: 1; // Ensure it is below the main content
  }

  &:hover::before {
    opacity: 1;
    box-shadow: 0 0 2px 2px rgba(0, 225, 255, 0.7); // Adjust the blur and spread to create a softer shadow
  }

  span {
    position: relative;
    z-index: 2; // Ensure the text is above the pseudo-element
  }
`;

const NavLinks: IStyledComponent<Runtime, INavLinksProps> = styled.div`
  display: flex;
  gap: 1rem;
  color: ${({ inColor }) => inColor};

  /* @media (max-width: 768px) {
    width: 100%;
    
    flex-direction: column;
     display: ${({ open }) => (open ? 'flex' : 'none')}; 
  } */
`;

// const Hamburger: IStyledComponent<Runtime, INavLinksProps> = styled.div`
//   display: none;
//   flex-direction: column;
//   cursor: pointer;

//   @media (max-width: 768px) {
//     display: flex;
//   }

//   div {
//     height: 3px;
//     width: 25px;
//     background: #fff;
//     margin: 4px 0;
//   }
// `;

export const Navbar: FC = () => {
  // const [open, setOpen] = useState<boolean>(false);

  return (
    <Nav>
      <WebTitle>
        <TitleText>kian.wiki</TitleText>
        {/* Other elements can go here */}
      </WebTitle>
      <NavLinks>
        <StyledLink href="/">
          <span>Home</span>
        </StyledLink>
        <StyledLink href="/about">
          <span>About</span>
        </StyledLink>
        <StyledLink href="/contact">
          <span>Contact</span>
        </StyledLink>
      </NavLinks>
    </Nav>
  );
};

export default Navbar;
