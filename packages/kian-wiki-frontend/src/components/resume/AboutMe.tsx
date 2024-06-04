import React from 'react';
import Section from '../common/Section';
import styles from '@/styles/SectionWrapper.module.css';

export const AboutMe: React.FC = () => (
  <div className={styles.sectionWrapper}>
    <Section title="Hey, I'm Kian.">
      <p>
        I&apos;m a software engineer with a Bachelor&apos;s degree in Computer
        Science from Cal Poly San Luis Obispo. I thrive on tackling new
        challenges and crafting innovative, data-driven solutions. Lately,
        I&apos;ve been diving into the world of machine learning, hoping to gain
        some new insights (and maybe give my fantasy football strategy a boost).
      </p>
      <p>
        I built this website using a Next.js frontend and a TypeScript backend,
        heavily leveraging AWS&apos;s serverless capabilities. I utilized
        services such as Lambda, S3, CloudFront, and RDS, along with monorepo
        tools like Nx, Yarn Workspaces, and Lerna. For CI/CD, I relied on GitHub
        Actions and AWS Amplify.
      </p>
      <p>
        Currently, I&apos;m a Senior Software Engineer at PlayStation. Here, I
        develop full-stack financial auditing services, create data pipelines,
        and automate financial processes using Node.js, Express.js, and
        Snowflake. Throughout my career, I&apos;ve worn many hats—from working
        on imaging systems with OpenCV to developing backend services with .NET
        Core and Spring.
      </p>
      <p>
        I&apos;m proficient in JavaScript, TypeScript, and Python. I&apos;m
        largely a self-starter, constantly refining my skills and seeking out
        mentors to further boost my architectural expertise. I continually push
        myself to develop more refined and precise code.
      </p>
      <p>
        I have a passion for automation and developing robust, scalable systems.
        Ensuring smooth, automated deployment processes and reliable monitoring
        systems is crucial to maintaining high standards of code quality and
        delivery efficiency.
      </p>
      <p>
        Hopefully, you&apos;ll enjoy exploring my work—and maybe even find some
        humor in my attempts to enhance my fantasy football performance with
        machine learning!
      </p>
    </Section>
  </div>
);
