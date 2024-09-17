---
id: universal
---

# Universal probabilistic programming languages

A universal PPL is a PPL that does not require that the probabilistic graphical model (PGM) of the model be known statically at compile time.
In other words, the number of random variables does not have to be known in advance.

A universal PPL has the following features in addition to a pure PGM:

  - stochastic recursion
  - stochastic branching

Examples of universal PPLs are:

  - TreePPL
  - [Birch](https://birch-lang.org).
  - [WebPPL](http://webppl.org/) 

Examples of PPLs which are constrained to a pure PGM arE:

  - [STAN](https://mc-stan.org/)
  - [RevBayes](https://revbayes.github.io/)
