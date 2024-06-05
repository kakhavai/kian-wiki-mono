import React from 'react';
import Section from '../common/Section';
import sectionStyles from '@/styles/Section.module.css';

export const Projects: React.FC = () => (
  <div className={sectionStyles.sectionWrapper}>
    <Section title="kian.wiki.mono">
      <p>
        (TypeScript, React.js, Lerna, Jest, Prisma ORM, Github Actions) - In
        Progress
      </p>
      <p>
        I am currently revamping my previous website into a comprehensive
        platform for new and future projects, leveraging a monorepo structure.
        Utilizing advanced tools like Lerna, this setup enhances scalability and
        allows for easier integration with multiple contributors. The monorepo
        will host a variety of applications, including a React-based front end
        for my personal resume, machine learning tools for analyzing football
        data, and REST APIs for accessing live sports information, all supported
        by shared libraries and validations. Linting has been meticulously
        configured to ensure a clear and consistent codebase, making it more
        accessible for both new and ongoing developers.
      </p>
    </Section>
    <Section title="ActionRogueLike">
      <p>(Unreal Engine 5, C++)</p>
      <p>
        Built a simple playground for a third person shooter leveraging Unreal
        Engine 5’s C++ implementations. This project was mainly important for
        honing object oriented principles, and it was just fun.
      </p>
    </Section>
    <Section title="kian.wiki">
      <p>(Node.js, React.js, Postgres, Github Actions)</p>
      <p>
        Developed a website using a React.js frontend, Node.js backend, and
        Postgres DB. Leveraged technologies such as Docker and Github Actions to
        create a playground for a preferred method of CI/CD; where a server
        instance could be tested, validated, and deployed securely and
        automatically.
      </p>
    </Section>
  </div>
);
