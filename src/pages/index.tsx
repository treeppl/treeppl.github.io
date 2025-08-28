import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
//import HomepageFeatures from '../components/HomepageFeatures';
import LandingpageText from '../components/LandingpageText';
import FundingSection from '../components/FundingSection';


function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      // TODO the below tag doesn't seem to have any effect currently
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <LandingpageText />
        <FundingSection 
          title="Funding"
          imageUrl="/img/funding.png"
        />
      </main>
    </Layout>
  );
}
