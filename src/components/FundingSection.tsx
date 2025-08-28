import useBaseUrl from '@docusaurus/useBaseUrl';
import React from 'react';
import clsx from 'clsx';
import styles from './FundingSection.module.css';
import Link from '@docusaurus/Link';

const FundingSection = ({title, imageUrl, description}) => {
  return (
    <section className={clsx('my-4', styles.sectionContainer)}>
      <div className="container">
        <h2 className={styles.sectionTitle}>{title}</h2>
        <div className={styles.sectionContent}>
          <div className={styles.sectionImage}>
            <img src={imageUrl} alt={title} className="img-fluid" />
          </div>
          <div className={styles.sectionDescription}>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FundingSection;