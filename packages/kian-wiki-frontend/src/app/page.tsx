'use client'; // Mark this file as a client component

import { Navbar } from '@/components/navbar/Navbar';
import ResumeDetails from '@/components/resume/ResumeDetails';
import styled, { IStyledComponent, Runtime } from 'styled-components';

const Wrapper: IStyledComponent<Runtime> = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  text-align: center;
  background: #000000;
  padding: 1rem;
  margin-left: 5rem;
  margin-right: 5rem;
`;

const Section: IStyledComponent<Runtime> = styled.section`
  flex: 1;
  padding: 1rem;
  background: #eb87ff;

  &:first-child {
    background: #000000;
  }

  &:last-child {
    background: #ca0000;
  }
`;

const HomePage: React.FC = () => (
  <Wrapper>
    <Navbar />
    <ResumeDetails />
  </Wrapper>
);

export default HomePage;
