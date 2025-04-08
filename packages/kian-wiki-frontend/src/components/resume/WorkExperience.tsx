import React from 'react';
import Section from '../common/Section';
import sectionStyles from '@/styles/Section.module.css';

export const WorkExperience: React.FC = () => (
  <div className={sectionStyles.sectionWrapper}>
    <Section title="PlayStation, Integrated Services · San Diego, CA">
      <p>Senior Software Engineer, Go and Node.js (June 2019 to Present)</p>
      <p>
        At PlayStation, I&apos;ve led the development of internal financial
        systems that process millions of sales transactions daily. My work spans
        both backend and frontend, with a focus on building scalable data
        pipelines in Go and Node.js, and designing dashboards that help finance
        teams audit, trace, and validate massive volumes of store activity.
      </p>
      <p>
        One of my most impactful contributions was designing and implementing a
        Kafka-to-Snowflake connector in Go, built for idempotent ingestion,
        dynamic mapping, and resilient error handling. I also created a
        suspension service for our auditing pipeline that automatically filters
        and isolates anomalous transactions in real time; helping to improve
        data integrity and reduce operational downtime.
      </p>
      <p>
        I&apos;ve integrated AWS services such as Lambda, S3, and Snowpipe to
        automate data flows and enhance system scalability. These systems run on
        top of an event-driven architecture powered by Kafka, which allows us to
        handle distributed processing across multiple teams and services with
        high reliability.
      </p>
      <p>
        Beyond engineering, I&apos;ve mentored junior developers in both Go and
        Node.js, and played an active role in improving internal standards
        around testing, CI/CD, and observability practices.
      </p>
    </Section>

    <Section title="3D Systems, Research and Development · San Diego, CA">
      <p>
        Software Developer II, Python and C# (.NET) (June 2017 to June 2019)
      </p>
      <p>
        At 3D Systems, I developed an imaging system in Python using OpenCV to
        analyze projected light paths from our 3D printers. This system played a
        key role in improving print accuracy by validating focus, alignment, and
        light intensity before each job was executed.
      </p>
      <p>
        My optimizations to the image-processing pipeline significantly
        increased the speed of assembly line validation, boosting throughput by
        over 85 percent and reducing bottlenecks in production.
      </p>
      <p>
        I also contributed backend services in C# using .NET Core to support the
        printer UI, and automated CI/CD workflows with Docker to streamline
        development and reduce deployment times across the team.
      </p>
    </Section>

    <Section title="DirecTV, Interactive Team · Los Angeles, CA">
      <p>
        Software Engineer Intern, Java and JavaScript (June 2016 to September
        2016)
      </p>
      <p>
        During my internship at DirecTV, I contributed to both the frontend and
        backend of an MLB application deployed across all set-top boxes. I
        developed JavaScript interfaces tailored to the performance constraints
        of embedded hardware, focusing on memory usage and responsiveness.
      </p>
      <p>
        On the backend, I created RESTful APIs using Java and Spring MVC, backed
        by a Hibernate ORM layer. I also wrote web scrapers to collect real-time
        stats and highlights from MLB.com, integrating that data into an Oracle
        database to keep content fresh and up-to-date. My contributions helped
        improve both the scalability and responsiveness of the app during
        high-traffic events.
      </p>
    </Section>
  </div>
);
