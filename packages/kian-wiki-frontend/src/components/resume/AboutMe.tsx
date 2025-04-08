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
        I&apos;m a senior software engineer with over seven years of experience
        designing back-end systems, building data pipelines, and automating
        cloud infrastructure. I graduated from Cal Poly San Luis Obispo with a
        degree in Computer Science, and over time I&apos;ve grown into a
        platform-minded engineer focused on reliability, scalability, and
        enabling others to move faster.
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
        <div className={imageStyles.imageContainer}>
          <Image
            alt="hobbes"
            src="/images/hobbes.jpg"
            fill
            sizes={imageSizes}
            priority
            className={imageStyles.image}
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
        <div className={imageStyles.imageContainer}>
          <Image
            alt="soccer"
            src="/images/soccer.jpg"
            fill
            sizes={imageSizes}
            priority
            className={imageStyles.image}
          />
        </div>
        <div className={imageStyles.imageContainer}>
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
        I built this site using a monorepo powered by Next.js, TypeScript, and
        AWS services like Lambda, S3, CloudWatch, and Amplify. CI/CD pipelines
        are fully automated with GitHub Actions and Nx, and I&apos;ve come to
        really enjoy streamlining development experience and deployment flows.
      </p>
      <p>
        At PlayStation, I lead efforts around scalable financial data pipelines
        using Go, Kafka, and Snowflake. I&apos;ve built internal tools that
        handle millions of records each day, and have worked extensively with
        AWS and event-driven systems to improve reliability and throughput
        across services.
      </p>
      <p>
        Recently, I&apos;ve been exploring observability and platform tooling
        with OpenTelemetry, Prometheus, and Grafana. I&apos;ve been building out
        a telemetry pipeline that connects traces, logs, and metrics to support
        deeper debugging and performance insights.
      </p>
      <p>
        I particularly enjoy CI/CD automation, system design, and enabling teams
        through shared infrastructure and tooling. I focus on improving
        developer workflows by applying consistent design patterns, enforcing
        code quality, and building reliable, scalable systems that support
        faster and safer software delivery.
      </p>
      <p>Feel free to reach out: akhavainkian@gmail.com</p>
    </Section>
  </div>
);
