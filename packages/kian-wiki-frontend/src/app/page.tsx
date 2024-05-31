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

const HomePage: React.FC = () => (
  <Wrapper>
    <Navbar />
    <ResumeDetails />
  </Wrapper>
);

export default HomePage;
