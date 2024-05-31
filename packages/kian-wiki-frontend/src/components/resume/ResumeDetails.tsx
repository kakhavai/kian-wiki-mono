'use client'; // Mark this file as a client component

import React from 'react';
import styled, { IStyledComponent, Runtime } from 'styled-components';
import WorkExperienceSection from './WorkExperienceSection';
import Section from '../common/Section';
import ProjectsSection from './ProjectSection';

const ResumeWrapper: IStyledComponent<Runtime> = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const ResumeDetails: React.FC = () => (
  <ResumeWrapper>
    <Section title="Kian Akhavain">
      <p>
        San Diego - kakhavain55@gmail.com -{' '}
        <a href="https://github.com/kakhavai">github.com/kakhavai</a>
      </p>
    </Section>
    <Section title="Education & Skills">
      <p>
        <strong>
          California Polytechnic State University, San Luis Obispo
        </strong>
        <br />
        Bachelor of Science in Computer Science, June 2017
      </p>
      <p>
        <strong>Languages:</strong> JavaScript, TypeScript, Python, Java, C#,
        C++, SQL
      </p>
      <p>
        <strong>Applications:</strong> Amazon AWS, GitHub, Docker, Snowflake,
        MySQL, Oracle SQL, Unreal Engine 5, Github Actions, Lerna
      </p>
      <p>
        <strong>Frameworks:</strong> Java Spring, Dotnet core, React.js,
        Node.js, Jest
      </p>
    </Section>
    <ProjectsSection />
    <WorkExperienceSection />
  </ResumeWrapper>
);

export default ResumeDetails;
