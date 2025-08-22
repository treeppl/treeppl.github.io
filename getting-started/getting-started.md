---
id: getting-started
---

# Getting started with TreePPL


## Using a TreePPL interface

We have developed R and Python interfaces to faciliate data preparation, program compilation and execution, post-processing, and visualization of inference results. We strive to provide the same functionalities in R and Python, but there might be small differences between the two interfaces because the project is under active development.

- **R** TreePPL is installed with the R package *treepplr*. [Install treepplr](https://treeppl.org/treepplr/index.html).

- **Python** TreePPL is installed with the package *treeppl-python*. [Install treeppl-python](https://github.com/treeppl/treeppl-python).


## Using TreePPL in the command line

You can install TreePPL without R or Python. This option is better suited for those who want to contribute to TreePPL development. 

Choose your operating system:

- [Instructions for Linux](install_linux.md)
- [Instructions for Mac](install_apple_silicon.md)
- [Instructions for Windows](install_windows.md)





<!-- ## What is TreePPL?

TreePPL is a universal[^1] probabilistic programming language (PPL) for evolutionary biology and phylogenetics.

The ultimate vision of probabilistic programming is to provide expressive model description languages, while at the same time supporting the automated generation of efficient inference algorithms. This allows empiricists to easily and succinctly describe any model they might be interested in, relying on the automated machinery to provide efficient inference algorithms for that model.

Current probabilistic programming languages (PPLs) are often difficult to use for empiricists. Furthermore, even though there is now (as of 2025) swift progress in PPL inference strategies, there is still a substantial gap in many domains before PPL systems can compete successfully with dedicated software, or even provide computationally feasible solutions.

The design principles of TreePPL are as follows:

1. TreePPL should be easy to use for empiricist. A source of inspiration in this context is [WebPPL](http://webppl.org/), which we think is one of the most accessible PPLs in terms of syntax. Beyond an intuitive syntax, TreePPL also needs to have extensive support for model components that are commonly used in phylogenetics.

2. TreePPL should provide state-of-the-art efficiency in the inference algorithms it generates from phylogenetic model descriptions. TreePPL should support advanced users that want to experiment with inference algorithms or develop entirely new inference strategies for phylogenetic models.

3. TreePPL should provide a number of pre-implemented models that users can use as starting points.

4. Phylogenetic data should be easy to handle in TreePPL.

We aim TreePPL primarily at computational biologists and bioinformaticians, however due to its universality, empiricists from all domains are welcome to experiment with the language and join the effort.



[^1]: A universal PPL is a PPL in which the number of r.v.'s does not have to be known at compilation time, i.e. random choices during runtime can lead to new r.v.'s being sampled. -->