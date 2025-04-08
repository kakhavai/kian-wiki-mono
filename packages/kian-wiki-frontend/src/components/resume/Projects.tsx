import React from 'react';
import Section from '../common/Section';
import sectionStyles from '@/styles/Section.module.css';
import { ProjectTitle } from './ProjectTitle';

export const Projects: React.FC = () => (
  <div className={sectionStyles.sectionWrapper}>
    <Section
      title={
        <ProjectTitle
          url="https://github.com/kakhavai/kian-wiki-mono"
          projectName="kian.wiki.mono"
        />
      }
    >
      <p>(TypeScript, AWS, Next.js, Nx, Prisma, GitHub Actions, Docker)</p>
      <p>
        I built a monorepo that powers my personal website and provides APIs and
        data pipelines to support machine learning tools and football analytics
        workflows. It includes scheduled data generation using AWS Lambda and
        S3, is deployed with AWS Amplify, and uses Nx to manage shared libraries
        and maintain scalable development across services.
      </p>
      <p>
        REST APIs written in TypeScript handle sports analytics workloads and
        serve precomputed data to the frontend. I use GitHub Actions to automate
        validation, testing, and deployment across the stack; including unit
        tests, integration tests, and automated deployment to AWS Amplify.
      </p>
      <p>
        One of the more interesting challenges I solved was identifying and
        reporting a key bug in AWS Amplify&apos;s monorepo build handling, which
        improved support for Nx-based apps.
      </p>
    </Section>

    <Section
      title={
        <ProjectTitle
          url="https://github.com/kakhavai/telemetry-tracker"
          projectName="Telemetry Tracker"
        />
      }
    >
      <p>(Go, OpenTelemetry, Grafana, Prometheus, Tempo, Loki, Chi, Docker)</p>
      <p>
        A vendor-neutral observability pipeline built in Go using OpenTelemetry
        for tracing, structured logging, and metrics collection. The stack
        supports backend switching between Grafana&apos;s Tempo and Loki, as
        well as Prometheus for metrics. Data is visualized in Grafana with full
        correlation between logs and spans.
      </p>
      <p>
        I containerized the full setup using Docker to enable quick testing and
        real-time insights in local environments. This project helped deepen my
        understanding of observability, tracing instrumentation, and telemetry
        pipelines in production-grade systems.
      </p>
    </Section>

    <Section
      title={
        <ProjectTitle
          url="https://github.com/kakhavai/ActionRoguelike"
          projectName="ActionRogueLike"
        />
      }
    >
      <p>(Unreal Engine 5, C++)</p>
      <p>
        A small playground built with Unreal Engine 5 in C++ to explore
        object-oriented programming and gameplay mechanics in a third-person
        shooter environment. While simple, it was a fun way to apply low-level
        code structure in a high-performance game engine.
      </p>
    </Section>
  </div>
);
