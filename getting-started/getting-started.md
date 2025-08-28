---
id: getting-started
---

# Getting started with TreePPL

We have developed R and Python interfaces to facilitate installation, data preparation, program compilation and execution, post-processing, and visualization of inference results. We strive to provide the same functionalities in R and Python, but there might be small differences between the two interfaces because the project is under active development.

If you want to contribute to TreePPL development, see [Instructions for developers](/docs/for-developers/). 

:::warning

We currently support Linux and MacOS only. For Windows users there are two options: use a virtual machine/server/cluster or use TreePPL with _WSL_ (see [Windows installation instructions](/docs/for-developers/install_windows)).

:::


## For R users

When you install the R package *treepplr*, TreePPL and everything it requires is also installed. For that, run within R or RStudio:

```r title="Install treepplr from R or RStudio"
devtools::install_github("treeppl/treepplr")
```

_treepplr_ converts data to a format readable by TreePPL, reads the TreePPL output, and connects to downstream analyses in model-specific packages, such as the _evolnets_ package for the host repertoire evolution model.

For complete _treepplr_ documentation, see [treepplr](https://treeppl.org/treepplr). There you will find the complete list of package functions (Reference) and all vignettes (Articles).


## For Python users

TreePPL can also be installed with the package _treeppl-python_. For that, got to [list of releases](https://github.com/treeppl/treeppl-python/releases) and download the wheel from the most recent release for your operating system. Then, run within Python:

```python title="Install treepplr from Python"
pip install name-of-file.whl
```

For more information, check _treeppl-python_ [Github repository](https://github.com/treeppl/treeppl-python).



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