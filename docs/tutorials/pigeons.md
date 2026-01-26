---
id: pigeons-tutorial
title: Parallel tempering with Pigeons.jl

sidebar_label: Parallel tempering with Pigeons.jl
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction
In this tutorial we will demonstrate how to use the Julia package [Pigeons.jl](https://pigeons.run/stable/) to parallelize and improve MCMC inference in TreePPL with parallel tempering.
Parallel tempering is particularly powerful for combinatorial, multimodal and overparametrized posteriors, which abound in statistical phylogenetics.

We will use the [constant rate birth-death](../model-library/diversification.md#constant-rate-birth-death) (CRBD) model as the running example.

### What is parallel tempering and Pigeons?
MCMC algorithms are inherently sequential algorithms, since the next iteration depends explicitly on what we are computing in the current.
This makes it difficult to harness parallel hardware in modern high performance computers to speed up MCMC inference.
Parallel tempering offers one solution to this problem by executing several communicating MCMC chains in parallel.
These chains interpolate between the prior distribution, from which it is easy to sample and explore new regions of parameter space, and the posterior distribution, which is the distribution we want to sample from. 
The interpolation is achieved by _tempering_ the posterior distribution, raising the model's likelihood to a power (called the temperature) that lies between $0$ and $1$.
At temperature $0$ the likelihood is ignored so we recover the prior, and at temperature $1$ we use the full likelihood and recover the posterior.
The goal of parallel tempering is thus to effectively move samples from prior to posterior through the intermediary temperatures, and the success hinges both on using an effective communication scheme and making suitable choice of intermediary temperatures.

[Pigeons.jl](https://pigeons.run/stable/) is a Julia package for sampling from difficult posterior distributions.
Along with other algorithms for achieving this task, it implements a state-of-the-art variant of parallel tempering called _non-reversible parallel tempering_ that uses an efficient communication scheme and adaptively sets the heating schedule to maximize the communication between prior and posterior distributions.
It is this algorithm that we can access with TreePPL models and that we will try out in this tutorial.
With Pigeons it is possible to run parallel tempering both on several cores on the same computer and across several machines on an HPC cluster, for more details on the latter see the [Pigeons documentation on MPI usage](https://pigeons.run/stable/mpi/).
Compared to classical variants of parallel tempering, Pigeons' performance does not deteriorate as the number of chains grows large.

## Running TreePPL models with Pigeons

### Installing Pigeons
To proceed in this tutorial we will assume that you have the programming language [Julia](https://julialang.org/) installed on your machine.
The latest version of Pigeons can then be installed by starting the Julia REPL and running
```julia
import Pkg;
Pkg.add("Pigeons")
```

If you want to plot the samples immediately in Julia you can also install the [MCMCChains](https://turinglang.org/MCMCChains.jl/stable/) and [StatsPlots](https://docs.juliaplots.org/dev/generated/statsplots/) packages by running
```julia
Pkg.add(["StatsPlots", "MCMCChains"])
```

### Compiling and running the CRBD model

We first set up the paths to the TreePPL source code for the CRBD model.
Here we assume that the [TreePPL repository](https:/github.com/treeppl/treeppl) is available at `./treeppl` in your working directory, please substitute this with the correct path on your machine.
```julia
# Path to the TreePPL repository
treeppl_path = "./treeppl"
# Path to the subdirectory containing the CRBD model
model_dir = "$treeppl_path/models/diversification"
# The name of CRBD model in the TreePPL model repository
model_name = "crbd"

# Path to the CRBD model
model_path = "$(model_dir)/$(model_name).tppl"
# Where to write the compiled binary
bin_path = "$(model_dir)/data/$(model_name).out"
# Path to some example data to run posterior inference on
data_path = "$(model_dir)/data/testdata_$(model_name).json"
# Path to the directory where the samples will be written
output_path = "pigeons_output_dir"
```

Next we want to compile the CRBD model and create a `TreePPLTarget` struct.
This struct is later passed to the Pigeons parallel tempering algorithm and contains the information Pigeons need to orchestrate parallel tempering on your TreePPL model.
For more information, try typing `?TreePPLTarget` in the Julia REPL.
To compile the model Pigeons also needs to have access to the TreePPL compiler, here we assume that it is available as `tpplc` in your `PATH`.

```julia
using Pigeons

# Compile the CRBD model
tppl_bin = Pigeons.tppl_compile_model(
    model_path, bin_path;
    local_exploration_steps=10, # The number of MCMC moves to perform in TreePPL before swapping temperatures
    sampling_period=10          # How often we should record the samples
)

# Construct the TreePPLTarget
tppl_target = Pigeons.tppl_construct_target(tppl_bin, data_path, output_path)
```

With the `TreePPLTarget` ready, we are ready to launch Pigeons!
The number of rounds determines how many iterations (or scans) to run: each successive round doubles the number of iterations in the previous round.
```julia
pt = pigeons(target = tppl_target, n_rounds = 12, n_chains = 10, multithreaded=true)
Pigeons.kill_child_processes(pt) # Kill the TreePPL processes after we are done
```

```terminal
┌ Info: Neither traces, disk, nor online recorders included.
│    You may not have access to your samples (unless you are using a custom recorder, or maybe you just want log(Z)).
└    To add recorders, use e.g. pigeons(target = ..., record = [traces; record_default()])
────────────────────────────────────────────────────────────────────────────
  scans        Λ        time(s)    allc(B)  log(Z₁/Z₀)   min(α)     mean(α) 
────────── ────────── ────────── ────────── ────────── ────────── ──────────
        2       3.99     0.0606   4.66e+06       -855   1.76e-21      0.557 
        4       4.88     0.0231   8.17e+06       -381   0.000169      0.458 
        8       6.03     0.0672   1.63e+07       -326    0.00777       0.33 
       16        5.7      0.116   3.27e+07       -299   2.83e-05      0.367 
       32       6.37      0.229   6.53e+07       -317   8.06e-07      0.292 
       64       6.44      0.413   1.31e+08       -310    0.00024      0.285 
      128       6.57      0.872   2.61e+08       -310     0.0021       0.27 
      256          7       1.66   5.22e+08       -310     0.0483      0.222 
      512       6.99       3.36   1.04e+09       -312     0.0961      0.223 
 1.02e+03       6.91       6.95   2.09e+09       -309     0.0902      0.232 
 2.05e+03       6.79       13.7   4.18e+09       -306     0.0618      0.246 
  4.1e+03       6.79       26.8   8.35e+09       -303     0.0766      0.246 
────────────────────────────────────────────────────────────────────────────
```

The output above gives some other useful information such as an estimate of the log-normalization-constant $\log(Z_1 / Z_0)$ between the prior distribution and the posterior. 
This is the model evidence in Bayesian statistics.
An important technical detail is that this estimate is between the _constrained_ prior, i.e. the prior plus any hard constraints such as `weight 0` statements, and the posterior distribution.
This means that log-normalization estimate of Pigeons compared to that of TreePPL's SMC algorithms will be different on problems with hard constraints; this will be updated in the future.

Another quantity of interest is the _global communication barrier_, $\Lambda$ in the output above, which measures how difficult it is to move samples from the prior to the posterior – a large $\Lambda$ means that it is difficult, a small $\Lambda$ that it is easy.
The global communication barrier also gives a rule of thumb for how many chains are needed: you should use $2\Lambda + 1$ for the algorithm to work efficiently.
If you suspect or know that the TreePPL MCMC kernel you are using is heavily autocorrelated on your problem it can be beneficial to use more chains than this; see [Syed et al., 2022](#non-rev2022) for more details.

We also want to look at the posterior samples produced by Pigeons and TreePPL, to do this we first need to compile the samples which are spread across several files into one file 
```julia
Pigeons.tppl_compile_samples(pt, "compiled_samples.json")
```
The sample file can then be analyzed using either of the companion packages `treeppl-python` or `treepplr`. 
However, the CRBD model has very simple outputs – a single float representing the speciation rate parameter – so we will also show a quick and dirty trace and density plot directly in Julia.
This assumes you installed the additional packages in the [installation section](#installing-pigeons).
```julia
using MCMCChains, StatsPlots
# Read the compiled samples file
samples = [parse(Float64, x) for x in readlines("compiled_samples.json")]
# Construct and Chains object from MCMCChains.jl 
ch = Chains(samples, [:λ])
# Plot the samples! 
plot(ch)
```
![](media/CRBD-trace.png)

## Further reading 

Documentation for the various functions used from [Pigeons.jl](https://pigeons.run/stable/) package is available in the [Pigeons API reference](https://pigeons.run/stable/reference/).
Note that it is also possible, and convenient, to access package documentation directly in the Julia REPL by first typing `?` and then the name of the thing you are interested in learning about, e.g. `?Pigeons.tppl_compile_model` to learn what options are available when compiling a model with Pigeons.

Please browse Pigeons' documentation further to learn more about how to interpret and configure the output from Pigeons.
Have a look at the [documentation on using MPI](https://pigeons.run/stable/mpi/) in particular if you are interested in running Pigeons in a distributed fashion.

## References
Please make sure to acknowledge the awesome work of the Pigeons team by citing their paper if you use Pigeons in your work.

<a id="pigeons2023"></a>
Surjanovic, N., Biron-Lattes, M., Tiede, P., Syed, S., Campbell, T., Bouchard-Côté, A., 2023. Pigeons.jl: Distributed Sampling From Intractable Distributions. https://doi.org/10.48550/arXiv.2308.09769

If you want to learn more about the theory of the non-reversible parallel tempering algorithm, you are recommended to read the following reference

<a id="non-rev2022"></a>
Syed, S., Bouchard-Côté, A., Deligiannidis, G., Doucet, A., 2022. Non-reversible parallel tempering: A scalable highly parallel MCMC scheme. Journal of the Royal Statistical Society: Series B (Statistical Methodology) 84, 321–350. https://doi.org/10.1111/rssb.12464
