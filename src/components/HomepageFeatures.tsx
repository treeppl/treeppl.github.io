import useBaseUrl from '@docusaurus/useBaseUrl';
import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';
import Link from '@docusaurus/Link';

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <div className={clsx('col')}>
            <div className="text--center padding-horiz--md">
              <p>
                <>
                  The aim of the TreePPL project is to develop a domain-specific PPL for statistical phylogenetics. More information can be found <Link to="/docs/treeppl">here</Link>.
                </>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
