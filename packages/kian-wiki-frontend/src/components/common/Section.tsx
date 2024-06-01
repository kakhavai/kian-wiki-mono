'use client'; // Mark this file as a client component

import React from 'react';
import styled, { IStyledComponent, Runtime } from 'styled-components';

interface ISectionProps {
  title: string;
  children: React.ReactNode;
}

const SectionWrapper: IStyledComponent<Runtime> = styled.section`
  margin: 1rem 0;
  padding: 1rem;
  border: 0px solid #fffdfd; // Light grey border to segment sections
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // Subtle shadow for depth

  h3 {
    border-bottom: 1px solid white;
    padding-bottom: 0.5rem;
  }

  p {
    margin: 1rem 0;
  }

  ul {
    list-style-type: none;
    padding: 0;

    li {
      margin-bottom: 0.5rem;
    }
  }
`;

const Section: React.FC<ISectionProps> = ({ title, children }) => (
  <SectionWrapper>
    <h3>{title}</h3>
    {children}
  </SectionWrapper>
);

export default Section;
