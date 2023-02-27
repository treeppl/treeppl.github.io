import React from 'react';
import Layout from '@theme/Layout';
import styles from './devteam.module.css';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';

const PersonList: PersonItem[] = [
  {
    title: 'Viktor Senderov',
    image: '/img/viktor.png',
    description: (
      <>
      <em>Lead Author.</em> Postdoctoral Fellow at
        <a href="https://www.phyloeco.bio.ens.psl.eu/people.html"> L'École 
        normale supérieure</a>
      </>
    ),
  },
  {
    title: 'Jan Kudlicka',
    image: 'img/jan.png',
    description: (
      <>
      Associate Professor of Data Science at
        <a hreff="https://jan.kudlicka.eu"> BI Norwegian Business School</a>
      </>
    ),
  },
  {
    title: 'Viktor Palmkvist',
    image: '/img/vipa.jpg',
    description: (
      <>
      Ph.D. Candidate at <a href="https://www.kth.se/profile/vipa"> KTH Royal
        Institute of Technology</a>
      </>
    ),
  },
  {
    title: 'Daniel Lundén',
    image: 'img/dlunde.png',
    description: (
      <>
      Ph.D. Candidate at <a href="https://www.kth.se/profile/dlunde"> KTH Royal
        Institute of Technology</a>  
      </>
    ),
  },
  {
    title: 'Emma Granqvist',
    image: 'img/emma.jpeg',
    description: (
      <>
       Researcher at
        <a href="https://ronquistlab.github.io/people.html#emma"> Naturhistoriska riksmuseet</a>
      </>
    ),
  },
  {
    title: 'Fredrik Ronquist',
    image: '/img/fredrik.jpg',
    description: (
      <>
      <em>Principle Investigator.</em> Professor at
        <a href="https://ronquistlab.github.io/people.html"> Naturhistoriska
        riksmuseet</a>
      </>
    ),
  },
  {
    title: 'David Broman',
    image: 'img/david2021.jpg',
    description: (
      <>
      <em>Principle Investigator.</em> Professor at <a href="https://people.kth.se/~dbro/bio.html">
      KTH Royal Institute of Technology</a>
      </>
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