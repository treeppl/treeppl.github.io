import React from 'react';
import Layout from '@theme/Layout';
import styles from './devteam.module.css';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';

const PersonList: PersonItem[] = [
  {
    title: (
      <a href="https://www.phyloeco.bio.ens.psl.eu/people.html">Viktor Senderov</a>
      ),
    image: '/img/viktor.png',
    description: (
      <>Postdoctoral Researcher at L'École normale supérieure</>
    ),
  },
  {
    title: (<a href="https://jan.kudlicka.eu">Jan Kudlicka</a>),
    image: 'img/jan.png',
    description: (
      <>Associate Professor of Data Science at BI Norwegian Business School</>
    ),
  },
  {
    title: (<a href="https://dlunde.github.io/">Daniel Lundén</a>),
    image: 'img/dlunde.png',
    description: (
      <>Senior Member of Technical Staff at Oracle</>
    ),
  },
  {
    title: (<a href="https://www.kth.se/profile/vipa">Viktor Palmkvist</a>),
    image: '/img/vipa.jpg',
    description: (
      <>Ph.D. Candidate at  KTH Royal Institute of Technology</>
    ),
  },
  {
    title: (<a href="https://marianapbraga.com">Mariana P. Braga</a>),
    image: 'img/mariana.jpg',
    description: (
      <>Postdoctoral Researcher at the Swedish University of Agricultural Sciences</>
    ),
  },
  {
    title: (<a href="https://ronquistlab.github.io/people.html#emma">Emma Granqvist</a>),
    image: 'img/emma.jpeg',
    description: (
      <>Postdoctoral Researcher at Department of Bioinformatics and Genetics,
        Swedish Museum of Natural History</>
    ),
  },
  {
    title: (<a href="https://www.kth.se/profile/caylak">Gizem Çaylak</a>),
    image: 'img/caylak.jpeg',
    description: (
      <>Ph.D. Candidate at KTH Royal Institute of Technology</>
    ),
  },
  {
    title: (<a href="https://ronquistlab.github.io/people.html#tim">Thimothée Virgoulay</a>),
    image: 'img/tim.jpeg',
    description: (
      <>Postdoctoral Researcher at Department of Bioinformatics and Genetics,
        Swedish Museum of Natural History</>
    ),
  },
  {
    title: (<a href="https://ronquistlab.github.io/people.html">Fredrik Ronquist</a>),
    image: '/img/fredrik.jpg',
    description: (
      <><em>PI together with Broman (eq. contribution) </em> 
      Department of Bioinformatics and Genetics,
      Swedish Museum of Natural History</>
    ),
  },
  {
    title: (<a href="https://people.kth.se/~dbro/bio.html">David Broman</a>),
    image: 'img/david2021.jpg',
    description: (
      <><em>PI together with Ronquist (eq. contribution) </em> 
      EECS and Digital Futures, KTH Royal Institute of Technology and
      Computer Science Department, Stanford University</>
    ),
  },
];

function Person({title, image, description}: PersonItem) {
  return (
    <div className={clsx('col col--3')}>
      <div className="text--center">
        <img
          className={styles.personSvg}
          alt={title}
          src={useBaseUrl(image)}
        />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}

// Shuffle the order of authors each time you display
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

// Use this if you want alphanumeric sorting
// {PersonList.sort((a, b) => a.title.localeCompare(b.title)).map((props, idx) =>
// Bug: does not reshuffle when you click F5
// {shuffle(PersonList).map((props, idx) =>
export default function Hello() {
  return (
  <Layout title="Meet the Team" description="Meet the Team">
    <div>
      <section className={styles.persons}>
        <div className="container">
          <div className="row">
          {PersonList.map((props, idx) =>
          (<Person key={idx} {...props} />))} 
          </div>
        </div>
      </section>
    </div>
  </Layout>);
}
