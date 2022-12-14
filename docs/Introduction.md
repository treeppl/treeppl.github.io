---
sidebar_position: 1
id: introduction
---

# Why TreePPL

Probabilistic programming techniques have developed rapidly in recent years. The ultimate vision is to provide expressive, Turing-complete model description languages, while at the same time supporting the automated generation of efficient inference algorithms from these model descriptions. This would allow empiricists to easily and succinctly describe any model they might be interested in, relying on the automated machinery to provide efficient inference algorithms for that model.

Current probabilistic programming languages (PPLs) are often difficult to use for empiricists. Furthermore, even though there is now swift progress in PPL inference strategies, there is still a substantial gap in many domains before PPL systems can compete successfully with dedicated software, or even provide computationally feasible solutions.

The aim of the TreePPL project is to develop a domain-specific PPL for statistical phylogenetics. There are three specific design goals:

1. TreePPL should be easy to use for empiricist. A source of inspiration in this context is [WebPPL](http://webppl.org/), which we think is one of the most accessible PPLs in terms of syntax. Beyond an intuitive syntax, TreePPL also needs to have extensive support for model components that are commonly used in phylogenetics.
2. TreePPL should provide state-of-the-art efficiency in the inference algorithms it generates from phylogenetic model descriptions. TreePPL should support advanced users that want to experiment with inference algorithms or develop entirely new inference strategies for phylogenetic models.
3. TreePPL should provide a number of pre-implemented models that users can use as starting points.
4. Phylogenetic data should be easy to handle in TreePPL.

In a [recent paper](https://www.biorxiv.org/content/10.1101/2020.06.16.154443v1), we introduce probabilistic programming and develop efficient PPL approaches to advanced models of biological diversification, such as the BAMM model and the ClaDS models, using [WebPPL](http://webppl.org/) and another recent PPL, [Birch](https://birch-lang.org). The paper demonstrates some of the potential power of probabilistic programming in statistical phylogenetics, and discusses the main hurdles that remain to be tackled before these techniques can be applied to the entire range of phylogenetic models.

TreePPL will be built on top of [Miking](https://doi.org/10.1145/3357766.3359531), a language framework for constructing efficient compilers for domain-specific languages.

This web site will be continuously updated, with the ultimate aim of developing it into the primary online resource for the TreePPL community.
