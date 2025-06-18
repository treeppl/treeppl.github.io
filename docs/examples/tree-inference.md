---
id: tree_inference
title: Tree inference
sidebar_label: Tree inference
---

# Tree inference

- `models/phylo/tree_inference`

The model version `tree_inference.tppl` is a simple backwards tree construction based on aligned DNA sequence data (converted to integers) as input, and using the Jukes-Cantor model of nucleotide substitution. An example input data file is provided: `tree_inference.json`

There are also other and more computationally efficient model versions using hard-coded pruning (Felsenstein's pruning algorith) and a scaled approach to the messages. Use the scaled version for efficient inference on larger datasets.

These basic models can easily be extended to adhere other models of nucleotide substitution. As an example, the GTR model with pruning is also available. 

