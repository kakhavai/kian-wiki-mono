'use client'; // Mark this file as a client component

import { Navbar } from '@/components/navbar/Navbar';
import styled, { IStyledComponent, Runtime } from 'styled-components';

const Wrapper: IStyledComponent<Runtime> = styled.div`
  display: flex;
  flex-direction: row;
  align-items: left;
  text-align: center;

  @media (min-width: 768px) {
    flex-direction: row;
    text-align: left;
  }
`;

const Section: IStyledComponent<Runtime> = styled.section`
  flex: 1;
  padding: 1rem;

  &:first-child {
    background: #000000;
  }

  &:last-child {
    background: #000000;
  }
`;

const HomePage: React.FC = () => (
  <Wrapper>
    <Navbar></Navbar>
    <Section>
      <h2>Welcome</h2>
      <p>
        This is a responsive web page designed to work on both mobile and
        desktop devices.
      </p>
    </Section>
    <Section>
      <h2>About</h2>
      <p>
        It uses Next.js and styled-components for styling and responsive design.
      </p>
    </Section>
  </Wrapper>
);

export default HomePage;
