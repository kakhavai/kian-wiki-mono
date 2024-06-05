import React from 'react';
import Section from '../common/Section';
import Image from 'next/image';
import imageStyles from '@/styles/Image.module.css';
import sectionStyles from '@/styles/Section.module.css';

const imageSizes: string = '(max-width: 768px) 213px, 33vw';

export const AboutMe: React.FC = () => (
  <div className={sectionStyles.sectionWrapper}>
    <Section title="Hey, I'm Kian.">
      <p>
        I&apos;m a software engineer with a Bachelor&apos;s degree in Computer
        Science from Cal Poly San Luis Obispo. I thrive on tackling new
        challenges and crafting innovative, data-driven solutions. Lately,
        I&apos;ve been diving into the world of machine learning, hoping to gain
        some new insights (and maybe give my fantasy football strategy a boost).
      </p>
    </Section>
    <Section title="">
      <div className={imageStyles.imageGallery}>
        <div className={imageStyles.imageContainer}>
          <Image
            alt="kian"
            src="/images/kian.jpg"
            fill
            sizes={imageSizes}
            priority
            className={imageStyles.image}
          />
        </div>
        <div className={`${imageStyles.imageContainer} `}>
          <Image
            alt="hobbes"
            src="/images/hobbes.jpg"
            fill
            sizes={imageSizes}
            priority
            className={`${imageStyles.image} `}
          />
        </div>
        <div className={imageStyles.imageContainer}>
          <Image
            alt="mom"
            src="/images/mom.jpg"
            fill
            sizes={imageSizes}
            priority
            className={imageStyles.image}
          />
        </div>
        <div className={`${imageStyles.imageContainer} `}>
          <Image
            alt="soccer"
            src="/images/soccer.jpg"
            fill
            sizes={imageSizes}
            priority
            className={`${imageStyles.image} `}
          />
        </div>
        <div className={`${imageStyles.imageContainer} `}>
          <Image
            alt="cousin"
            src="/images/cousin.jpg"
            fill
            sizes={imageSizes}
            priority
            className={imageStyles.image}
          />
        </div>
        <div className={imageStyles.imageContainer}>
          <Image
            alt="kitten"
            src="/images/kitten.jpg"
            fill
            sizes={imageSizes}
            priority
            className={imageStyles.image}
          />
        </div>
      </div>
    </Section>
    <Section title="">
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
        largely a self-starter, always looking for new ways to improve my skills
        and actively seeking out mentors to further boost my architectural
        expertise. I continually push myself to develop more refined and precise
        solutions.
      </p>
      <p>
        I have a passion for automation and developing robust, scalable systems.
        Ensuring smooth, automated deployment processes and reliable monitoring
        systems is crucial to maintaining high standards of code quality and
        delivery efficiency.
      </p>
      <p>Feel free to reach out: akhavainkian@gmail.com</p>
    </Section>
  </div>
);
