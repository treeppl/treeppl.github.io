import React from 'react';
import Layout from '@theme/Layout';
import styles from './devteam.module.css';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';

// List of current core team
const PersonList = [
  {
    title: (<a href="https://www.phyloeco.bio.ens.psl.eu/people.html">Viktor Senderov</a>),
    image: '/img/viktor.png',
    description: (<>Postdoctoral Researcher at L'École normale supérieure</>),
  },
  {
    title: (<a href="https://jan.kudlicka.eu">Jan Kudlicka</a>),
    image: 'img/jan.png',
    description: (<>Associate Professor of Data Science at BI Norwegian Business School</>),
  },
  {
    title: (<a href="https://www.kth.se/profile/vipa">Viktor Palmkvist</a>),
    image: '/img/vipa.jpg',
    description: (<>Postdoctoral Researcher at Department of Bioinformatics and Genetics,
      Swedish Museum of Natural History</>),
  },
  {
    title: (<a href="https://marianapbraga.com">Mariana P. Braga</a>),
    image: 'img/mariana.jpg',
    description: (<>Associate senior lecturer at the Department of Ecology, SLU and DDLS Fellow, Scilifelab</>),
  },
  {
    title: (<a href="https://ronquistlab.github.io/people.html#emma">Emma Granqvist</a>),
    image: 'img/emma.jpeg',
    description: (<>Postdoctoral Researcher at Department of Bioinformatics and Genetics,
      Swedish Museum of Natural History</>),
  },
  {
    title: (<a href="https://www.kth.se/profile/caylak">Gizem Çaylak</a>),
    image: 'img/caylak.jpeg',
    description: (<>Ph.D. Candidate at KTH Royal Institute of Technology</>),
  },
  {
    title: (<a href="https://ronquistlab.github.io/people.html#tim">Thimothée Virgoulay</a>),
    image: 'img/timv.jpg',
    description: (<>Postdoctoral Researcher at Department of Bioinformatics and Genetics,
      Swedish Museum of Natural History</>),
  },
  {
    title: (<a href="https://ronquistlab.github.io/people.html">Fredrik Ronquist</a>),
    image: '/img/fredrik.jpg',
    description: (<><em>PI together with Broman (eq. contribution) </em>
      Department of Bioinformatics and Genetics, Swedish Museum of Natural History</>),
  },
  {
    title: (<a href="https://people.kth.se/~dbro/bio.html">David Broman</a>),
    image: 'img/david2021.jpg',
    description: (<><em>PI together with Ronquist (eq. contribution) </em>
      EECS and Digital Futures, KTH Royal Institute of Technology</>),
  },
];

// List of Contributors
const PersonList_Cont = [
  {
    title: (<a href="https://dlunde.github.io/">Daniel Lundén</a>),
    image: 'img/dlunde.png',
    description: (<>Senior Member of Technical Staff at Oracle</>),
  },
];

// --- Person card ---
function Person({title, image, description}) {
  return (
    <div className={clsx('col col--3')}>
      <div className="text--center">
        <img className={styles.personSvg} alt={String(title)} src={useBaseUrl(image)} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}

// --- Section renderer (shows just a heading if empty) ---
function PeopleSection({id, title, people}) {
  return (
    <section id={id} className={styles.persons}>
      <div className="container">
        <h2 className={clsx('margin-bottom--lg', styles.sectionTitle)}>{title}</h2>
        {people && people.length > 0 && (
          <div className="row">
            {people.map((p, i) => <Person key={`${id}-${i}`} {...p} />)}
          </div>
        )}
      </div>
    </section>
  );
}

export default function ContributorsPage() {
  return (
    <Layout title="Contributors" description="Contributors">
      <div>
        <PeopleSection
          id="current-core-team"
          title="Current core team"
          people={PersonList}
        />
        <PeopleSection
          id="contributors"
          title="Contributors"
          people={PersonList_Cont}
    //    />
    //    <PeopleSection
    //      id="how-to-become-a-contributor"
    //      title="How to become a contributor"
     //     people={[]}
        />
      </div>
    </Layout>
  );
}
