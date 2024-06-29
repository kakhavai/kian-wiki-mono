import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import sectionStyles from '@/styles/Section.module.css';
import navbarStyles from '@/styles/Project.module.css';

interface IProjectTitleProps {
  url: string;
  projectName: string;
}

export const ProjectTitle: React.FC<IProjectTitleProps> = ({
  url,
  projectName,
}) => (
  <div className={sectionStyles.flexTitle}>
    <span>{projectName}</span>
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${sectionStyles.alignRight} ${navbarStyles.styledLink}`}
    >
      <FontAwesomeIcon icon={faGithub} />
    </Link>
  </div>
);
