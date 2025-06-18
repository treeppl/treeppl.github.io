import useBaseUrl from '@docusaurus/useBaseUrl';
import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';
import Link from '@docusaurus/Link';

const FeatureList: FeatureItem[] = [
  {
    title: 'Simplicity',
    image: '/img/easy-to-use.png',
    description: (
      <>
      Designed to be user-friendly.
      </>
    ),
  },
  {
    title: 'Focus on Life Sciences',
    image: '/img/phylogenetic.png',
    description: (
      <>
        Focused on, but not limited to, the field of phylogenetics, evolutionary biology and biodiversity.
      </>
    ),
  },
  {
    title: 'Model Library',
    image: 'img/model.png',
    description: (
      <>
        Offers a variety of state-of-the art models as templates.
      </>
    ),
  },
  {
    title: 'Powerful Statistical Inference',
    image: 'img/engineering.png',
    description: (
      <>
        Sequential Monte-Carlo (SMC) and Markov-chain Monte-Carlo (MCMC) inference.
      </>
    ),
  },
];

function Feature({title, image, description}: FeatureItem) {
  return (
    <div className={clsx('col col--3')}>
      <div className="text--center">
        <img
          className={styles.featureSvg}
          alt={title}
          src={useBaseUrl(image)}
        />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}




export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          
        {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
