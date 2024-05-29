'use client';

import styled, { Runtime, IStyledComponent, css } from 'styled-components';
import Link from 'next/link';
import {
  FC,
  HTMLAttributes,
  ReactNode,
  useState,
  useRef,
  useEffect,
  RefObject,
  MutableRefObject,
} from 'react';

// Define interface for NavLinks props
interface INavLinksProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  inColor?: string;
  children?: ReactNode;
  href?: string;
  transform?: string;
  ref?: RefObject<HTMLDivElement>;
}

const WebTitle: IStyledComponent<Runtime, INavLinksProps> = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  padding: 1rem;
  position: relative;
  transition:
    transform 0.5s,
    box-shadow 0.3s;

  ${({ transform }) =>
    transform &&
    css`
      transform: ${transform};
    `}

  @media (max-width: 428px) {
    display: none; // Hide the title text when screen width is less than 428px
  }

  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -20px;
    z-index: -1;
  }

  &:hover::before {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -20px;
  }
`;

const TitleText: IStyledComponent<Runtime, INavLinksProps> = styled.div`
  font-size: 1.5em; // Similar to h1 font-size
  font-weight: bold; // Similar to h1 font-weight
  margin: 0; // Reset default margin
  user-select: none; // Prevent text selection
  cursor: default; // Set cursor to default arrow

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

  @media (max-width: 428px) {
    justify-content: center; // Center the nav links when screen width is less than 428px
  }
`;

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
    border-radius: 10px;
    opacity: 0;
    transition:
      opacity 0.3s,
      box-shadow 0.3s;
    z-index: 1;
  }

  &:hover::before {
    opacity: 1;
    box-shadow: 0 0 2px 2px rgba(0, 225, 255, 0.7);
  }

  span {
    position: relative;
    z-index: 2;
  }
`;

const NavLinks: IStyledComponent<Runtime, INavLinksProps> = styled.div`
  display: flex;
  gap: 1rem;
  color: ${({ inColor }) => inColor};

  @media (max-width: 428px) {
    justify-content: center; // Center the nav links when screen width is less than 428px
  }
`;

export const Navbar: FC = () => {
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
    const maxDistance: number = 50; // Max distance to move the text
    const moveX: number = -(x / distance) * Math.min(distance, maxDistance);
    const moveY: number = -(y / distance) * Math.min(distance, maxDistance);

    setTransform(
      `translate(${moveX}px, ${moveY}px) scale(${
        1 - Math.min(distance, maxDistance) / 200
      })`,
    );
    setIsTransforming(true);

    // Reset the timeout
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
    <Nav>
      <WebTitle
        ref={titleRef}
        transform={transform}
        onMouseMove={handleMouseMove}
      >
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
