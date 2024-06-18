import React from 'react';
import Link from 'next/link';
import Section from '../common/Section';
import sectionStyles from '@/styles/Section.module.css';
import projectStyles from '@/styles/Project.module.css';

export const Projects: React.FC = () => (
  <div className={sectionStyles.sectionWrapper}>
    <Section
      title={
        <Link
          href="https://github.com/kakhavai/kian-wiki-mono"
          className={projectStyles.styledLink}
          target="_blank"
        >
          kian.wiki.mono
        </Link>
      }
    >
      <p>
        (TypeScript, Next.js, AWS Amplify, Lambda, S3, Lerna, Jest, Prisma ORM,
        GitHub Actions)
      </p>
      <p>
        I have revamped my website kian.wiki into a comprehensive platform for
        current and future projects, utilizing a monorepo structure for better
        scalability and integration. Lerna helps manage multiple projects within
        the monorepo, ensuring seamless collaboration.
      </p>
      <p>
        The platform includes a Next.js-based front end for my resume, machine
        learning tools for football data analysis, and REST APIs for live sports
        information, all supported by shared libraries. Linting ensures a
        consistent codebase, aiding both new and existing developers.
      </p>
      <p>
        AWS Lambda functions are used to generate data periodically, which is
        then stored in S3. This precomputed data allows the Next.js front end to
        regenerate with the latest information. Next.js&apos;s Incremental
        Static Regeneration (ISR) re-renders pages whenever S3 data is updated,
        ensuring the site always displays current information.
      </p>
      <p>
        CI/CD is handled using GitHub Actions, with Jest ensuring code quality
        through comprehensive testing. TypeScript and Prisma ORM enhance
        development with type safety and efficient database management.
      </p>
      <p>
        AWS Amplify simplifies deployment and hosting, providing a robust
        infrastructure. This project significantly upgrades my previous website,
        transforming it into a versatile, high-quality platform for various
        applications.
      </p>
    </Section>
    <Section
      title={
        <Link
          href="https://github.com/kakhavai/ActionRoguelike"
          className={projectStyles.styledLink}
          target="_blank"
        >
          ActionRogueLike
        </Link>
      }
    >
      <p>(Unreal Engine 5, C++)</p>
      <p>
        Built a simple playground for a third person shooter leveraging Unreal
        Engine 5’s C++ implementations. This project was mainly important for
        honing object oriented principles, and it was just fun.
      </p>
    </Section>
    <Section
      title={
        <Link
          href="https://github.com/kakhavai/kian-wiki"
          className={projectStyles.styledLink}
          target="_blank"
        >
          <span>kian.wiki</span>
        </Link>
      }
    >
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
