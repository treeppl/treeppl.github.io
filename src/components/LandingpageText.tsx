import useBaseUrl from '@docusaurus/useBaseUrl';
import React from 'react';
import clsx from 'clsx';
import styles from './LandingpageText.module.css';
import Link from '@docusaurus/Link';

const LandingpageText: React.FC = () => {
  return (
    <div className={styles.Content}>
      <div className={styles.HeaderContainer}>
        <h3 className={styles.Tagline}>Why choose TreePPL?</h3>
        <h4 className={styles.Description}>
          TreePPL expresses models as computer programs that generate simulations based on input data. Specialized inference machinery then estimate posterior probability distributions for the program.
        </h4>
        <h4 className={styles.DescriptionBold}>
          This approach lets users focus on model description while getting inference automatically.
        </h4>
        <h4 className={styles.Description}>
          The modeling language is designed to feel familiar to R and Python users and employs a functional programming style that works well with generic inference algorithms. Users can conveniently compile and run model programs from Python or R environments, which handle pre-processing, data input, inference control, and output processing.
        </h4>
      </div>
    </div>
  );
};



export default LandingpageText;

