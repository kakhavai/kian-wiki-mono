'use client'; // Mark this file as a client component

import { Navbar } from '@/components/navbar/Navbar';
import WorkExperienceSection from '@/components/resume/WorkExperienceSection';
import styled, { IStyledComponent, Runtime } from 'styled-components';

const Wrapper: IStyledComponent<Runtime> = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  text-align: left;
  padding: 1rem;
  max-width: 772px;
  width: 100%;
  margin: 0 auto;
  transition: margin 0.5s ease;

  @media (max-width: 772px) {
    margin-left: 1rem;
    margin-right: 1rem;
  }

  @media (max-width: 671px) {
    margin-left: 0;
    margin-right: 0;
  }
`;

const HomePage: React.FC = () => (
  <Wrapper>
    <Navbar />
    <WorkExperienceSection />
  </Wrapper>
);

export default HomePage;
