import React from 'react';
import Section from '../common/Section';
import sectionStyles from '@/styles/Section.module.css';

export const WorkExperience: React.FC = () => (
  <div className={sectionStyles.sectionWrapper}>
    <Section title="PlayStation - Information Systems, San Diego, CA">
      <p>Senior Software Engineer ~ Node.js (6/19 – Current)</p>
      <ul>
        <li>
          Full stack developer for our financial auditing tools web server:
          built the data pipelines, automation, and dashboards that linked
          external sales to our internal systems and teams. Made massive amounts
          of sales data readable, auditable, and actionable.
        </li>
        <li>
          Front end development of finance reporting software: Made big data
          legible and usable for Playstation Store Finance teams.
        </li>
        <li>
          Back end development: Used Node.js and Express.js to build our
          webserver as well as data pipelines and automation.
        </li>
        <li>
          Database: Used an Oracle Relational Database, later migrating to
          Snowflake to store all relevant data.
        </li>
        <li>
          CI/CD: Integral in migrating our codebase to AWS leveraging the AWS
          SDK, Docker, Jest, and Jenkins to automate deployment and monitoring
          processes. Followed an agile production cycle with code reviews and
          weekly stand ups.
        </li>
      </ul>
    </Section>
    <Section title="3D Systems – Research And Development, San Diego, CA">
      <p>Software Developer II ~ Python / C# (Dotnet) (6/17 – 6/19)</p>
      <ul>
        <li>
          Used OpenCV to create an imaging system that would analyze our 3d
          printers’ projected light path and determine whether the light path
          had a level of focus, alignment, and power that was acceptable for
          accurate printing.
        </li>
        <li>
          Backend C# Developer – Worked on continuous integration of backend
          services for our printer UI in .NET core. Worked with a team of 12 in
          an agile development process with bi-weekly sprints. CI was purely
          done through github and Docker.
        </li>
        <li>
          Developed a test suite that abstracted our printer’s firmware to a
          level where our mechanical engineers could use a GUI to create any
          test plan that they wanted to execute on the printer’s various
          components without having to know how to code themselves.
        </li>
      </ul>
    </Section>
    <Section title="DIRECTV – Interactive Team, Los Angeles, CA">
      <p>Software Engineer Intern ~ Java/JavaScript (6/16 – 9/16)</p>
      <ul>
        <li>
          Front and backend developer for an MLB application to be released
          across all DirecTV set top boxes.
        </li>
        <li>
          Developed frontends for our set top boxes using JavaScript, had to
          handle many limitations of set top boxes like texture memory.
        </li>
        <li>
          Developed backend Restful APIs in Java using Spring MVC as well as a
          Hibernate ORM.
        </li>
        <li>
          Created scrape services that pulled highlights and player data from
          MLB.com to populate our Oracle database.
        </li>
      </ul>
    </Section>
  </div>
);
