import useBaseUrl from '@docusaurus/useBaseUrl';
import React from 'react';
import clsx from 'clsx';
import styles from './LandingpageText.module.css';
import Link from '@docusaurus/Link';

const treepplCode = `function walk(node: Tree, time:Real, lambda: Real) {
  observe 0 ~ Poisson(lambda * (time - node.age));
  if node is Node {
    observe 0.0 ~ Exponential(lambda);
    walk(node.left, node.age, lambda);
    walk(node.right, node.age, lambda);
  }
}

model function crb(tree: Tree) => Real {
  assume lambda ~ Gamma(1.0, 1.0);
  walk(tree.left, tree.age, lambda);
  walk(tree.right, tree.age, lambda);
  return lambda;
}`;

function highlightLine(line: string): React.ReactNode[] {
  const pattern = /\b(function|observe|model|assume|if|is|return)\b|\b(Real|Tree)\b|\b(Poisson|Exponential|Gamma)\b/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(line)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<span key={key++}>{line.slice(lastIndex, match.index)}</span>);
    }
    const className = match[1] ? styles.keyword : match[2] ? styles.type : styles.distribution;
    parts.push(
      <span key={key++} className={className}>
        {match[0]}
      </span>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < line.length) {
    parts.push(<span key={key++}>{line.slice(lastIndex)}</span>);
  }

  return parts;
}

function highlightCode(code: string): React.ReactNode[] {
  return code.split('\n').map((line, i, arr) => (
    <React.Fragment key={i}>
      {highlightLine(line)}
      {i < arr.length - 1 ? '\n' : null}
    </React.Fragment>
  ));
}

const LandingpageText: React.FC = () => {
  return (
    <div className={styles.Content}>
      <div className={styles.TwoColumnLayout}>
        <div className={styles.TextColumn}>
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
        <div className={styles.CodeColumn}>
          <pre className={styles.CodeBlock}>
            <code>{highlightCode(treepplCode)}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default LandingpageText;
