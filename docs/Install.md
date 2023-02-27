---
sidebar_position: 2
id: installation
--- 

# Getting Started

In order to get started with TreePPL development you need to install both the Miking and the Miking-DPPL packages from GitHub.

## Miking installation

To install Miking, follow the [online instructions](https://miking.org/install). 
In a nutshell, if you have all the necessary prerequisties such as OPAM, O'CAML, etc., you checkout the `develop` branch and issue from the `miking` directory:

```bash title="Install Miking (bash)"
make clean
make install
cd stdlib; export MCORE_STDLIB=`pwd`; cd ..;
```

## Miking DPPL installation

TreePPL itself is not a stand-alone package (2022-09-30), but rather it is a part of Miking-DPPL, and it is found under the `treeppl/` directory.
The installation of `Miking-DPPL` has several steps.
First, you install [CorePPL](https://miking.org/docs/miking-dppl#coreppl), which is an intermediate level probabilistic programming language, to which all TreePPL programs compile to.

:::info
CorePPL can be thought of a probabilistic extension of the base Miking language, MCore.
[MCore](https://miking.org/docs/miking#mcore) itself consists of two components: MExpr, which is an MCore expression, and MLang, which is a language for defining 
languages.
:::

Then, from the `miking-dppl` directory you issue:

```bash title="Install CorePPL (bash)"
make 
make install
```

Then, to install the TreePPL compiler itself, `tpplc`, you issue:

```bash title="Install TreePPL (bash)"
make install-treeppl
```

:::tip
If you want to unistall TreePPL you can use:

```bash title="Uninstall TreePPL (bash)"
make uninstall-treeppl
```
:::

Finally, you need to set up some environment variables.
From the `miking-dppl` directory, issue:

```bash title="Setup environment variables (bash)"
export MIDPPL_SRC=`pwd`/coreppl/src
export TPPL_SRC=`pwd`/treeppl
```

:::info
This behavior is programmed in the `Makefile` in the root of `miking-dppl`.
There is another makefile, under `treeppl/Makefile`, which holds the recipe for building `tpplc`.
:::

Optionally, you may need to install the CUDA C++ backend compiler itself, RootPPL `rppl`:

```bash title="Install RootPPL"
make install-rootppl
```

:::info
RootPPL is a CUDA-accellarated backend for TreePPL, currently being phased out
and replaced by CorePPL (2022-12-09).
:::


## Workflow and compilation

There are several steps to modeling with TreePPL (or in any
universal probabilistic programming language):

  1. Encoding the mathematical model of interest as a generative probabilistic simulation.
  2. Conditioning the generated output of your probabilistic simulation on
  real data.
  3. Selecting a suitable inference (e.g. SMC or MCMC).
  4. Running the compiled model and evaluationg the results.

For step 1, you write a TreePPL program, which is a file with the `.tppl` extension;
this can be done with any editor of choice.
Step 2 involves indicating in the above program, where the data is stored and
adding special `observe` statements to condition your simulation on that data.
In step 3, you produce an exeutable by compiling your program. The compiler must
know what inference strategy to use in order to produce the executable program.
Finally, by running the compiled program you get (a) samples from the conditional
distribution that your model specifies and (b) estimates of the normalizing constant
given the data, i.e. how good is your model.  Those can be further analyzed in
a data science workbook (e.g. R or Python)

:::caution
At the present stage, data input (step 2) is done
at compile time, by compiling the input data into the program.
Inference is selected by by a compiler flag.
For the 1.0 release of the language this will be changed and data will be
read in via a function during the program execution.
:::

There are three ways to compile and run TreePPL files: from the command line,
from R, or from Python.

:::caution
Currently, only command-line compilation is supported.
:::

### Command-line usage

Let's take the simple "flip" example, found under `models/flip/`.
Here, you will find three files: 

  - `flip.tppl`, which is the TreePPL program source,
  - `data.mc`, which is an MCore source file, containig input as bindings (temporary measure),
  - and `flip.mc`, which is a test CorePPL source file (this is not needed
  for regular TreePPL model development, but it is useful for compiler hacking,
  see next chapter).

Assuming you have installed the TreePPL compiler `tpplc`, you build the program

```{bash title="Compiling a simple model with tpplc"}
  tpplc models/flip/flip.tppl models/flip/data.mc
```

This will produce an executable called `out` that you can run.

```{bash title="Sample output from a compiled program"}
$ ./out
0.
false 0.
$ ./out
0.
true 0.
$ ./out
0.
true 0.
```

The first line after the execution is the log-value of the normalizing constant,
the second line is one sample, together with its weight.  Because `flip` is a 
simple program that does not condition on any real data, the weight and the
normalizing constant are zero.

:::tip
In the future, You will be able to change default inference target at this stage
by an additional compiler flag on the command line.
Currently, the flag has to be set however, in the compiler source code.
Two possible options are `mexpr` and `rootppl`, the default being `mexpr`.
Changing it to `rootppl` requires an edit in the `tpplc.mc` compiler itself 
(2022-12-12).

A lot more options are coming up:
  - Likelihood weighting (similar to importance sampling)
  - Lightweight MCMC (WebPPL-style MCMC)
  - Aligned SMC
  - Naive, trace MCMC (for development purposes)
  - Particle-independent Metropolis-Hastings (PMCMC)
  - SMC: alive particle filter and bootstrap SMC
:::

### R usage

Not supported yet.

### Python usage

Not supported yet.
