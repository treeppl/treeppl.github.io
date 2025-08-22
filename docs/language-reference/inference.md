# Inference methods

TreePPL supports number of inference methods.
The user needs to select the inference method and options.
To get a complete list of the available methods and options the user can type `tpplc --help` on the command line, which will provide all supported command-line options.
One can define the schema by issuing a command-line compilation command, or by making the appropriate choices in Python or R.
Please find below a reference list of the supported strategies with an explanation.

## Importance Sampling

```bash
tpplc <program> -m is-lw
```

This is a basic inference schema that should not be used for complex models.
It is useful for illustrating and understanding probabilistic programming.

#### Options available

```bash
--particles INT                   The number of particles (i.e., samples or iterations). The default is 5000
--no-early-stop                   Disables early stopping in certain inference algorithms.
--cps ARG                         Configuration of CPS transformation (only applicable to certain inference algorithms). The supported options are: none, partial, and full. Default: full.
--dynamic-delay                   Runs dynamic delayed sampling on the model.
--prune                           The model is pruned if possible.
```

## Sequential Monte Carlo (SMC) Methods

TreePPL supports two SMC methods:

  - bootstrap particle filter (BPF), and
  - alive particle filter (APF).

### Bootstrap particle filter (BPF)

```bash
tpplc <program> -m smc-bpf
```

This is the classical SMC schema.
Except in special cases, the alive particle filter (APF) should be preferred as the BPF can suffer from [path degeneration](../Explanation/path-degeneration.md).

This inference is affected by the resample placement method.

#### Options available

```bash
--particles INT                   The number of particles (i.e., samples or iterations). The default is 5000
--subsample                       Whether to subsample the posterior distribution.
--subsample-size INT              The number of subsamples to draw if --subsample is selected. Default: 1
--resample ARG                    The selected resample placement method, for inference algorithms where applicable. The supported methods are: likelihood (resample immediately after all likelihood updates), align (resample after aligned likelihood updates, forces --align), and manual (sample only at manually defined resampling locations). Default: manual
--resample-frac FLOAT             Floating point number to trigger resampling for SMC-BPF when ESS is less than resampleFrac × particleCount. Default: 0.7
--cps ARG                         Configuration of CPS transformation (only applicable to certain inference algorithms). The supported options are: none, partial, and full. Default: full.
--prune                           The model is pruned if possible.
--dynamic-delay                   Runs dynamic delayed sampling on the model.
```

### Alive particle filter (APF)

```bash
tpplc <program> -m smc-apf
```

This is a more advanced SMC schema than BPF.
It avoids [path degeneration](../Explanation/path-degeneration.md) by keeping a population of particles alive.

[Reference: Kudlicka et al. 2020](https://proceedings.mlr.press/v115/kudlicka20a.html).

#### Options available

```bash
--particles INT                   The number of particles (i.e., samples or iterations). The default is 5000
--subsample                       Whether to subsample the posterior distribution.
--subsample-size INT              The number of subsamples to draw if --subsample is selected. Default: 1
--resample ARG                    The selected resample placement method, for inference algorithms where applicable. The supported methods are: likelihood (resample immediately after all likelihood updates), align (resample after aligned likelihood updates, forces --align), and manual (sample only at manually defined resampling locations). Default: manual
--cps ARG                         Configuration of CPS transformation (only applicable to certain inference algorithms). The supported options are: none, partial, and full. Default: full.
--prune                           The model is pruned if possible.
```

## Markov-chain Monte Carlo (MCMC) Methods

TreePPL supports a range of MCMC methods:

  - Lightweight MCMC
  - Naive and Trace MCMC
  - particle MCMC--particle-independent Metropolis-Hastings

### Lightweight MCMC

```bash
tpplc <program> -m mcmc-lightweight
```

This is the Markov-chain Monte Carlo (MCMC) schema that should be used in most cases.
Moves are proposed by resampling one `assume` statement at random.
Draws that are [aligned](../Explanation/alignment.md) together with some unaligned draws are reused to save computational effort.
It has an option of whether to do a continuation-passing style transformation in order to avoid recomputation of the likelihood. For details, see [Lunden et al. 2024](https://link.springer.com/chapter/10.1007/978-3-031-57267-8_12).

#### Options available

```bash
--align                           Whether or not to align the model for certain inference algorithms.
--debug-iterations                Output various debug information each iteration.
--sampling-period N               Sample the mcmc-chain every Nth iteration. Default: 1
--incremental-printing            Print each sample as it is produced instead of at the end.
--particles INT                   The number of particles (i.e., samples or iterations). The default is 5000
--mcmc-lw-gprob FLOAT             The probability of performing a global MH step (non-global means only modify a single sample in the previous trace). Default: 0.1
--kernel                          Use drift Kernel in MCMC.
--drift FLOAT                     Floating point number which corresponds to the standard deviation (sigma) of the normal distribution that will be used for the automatic drift kernel. Default: 1.
--cps ARG                         Configuration of CPS transformation (only applicable to certain inference algorithms). The supported options are: none, partial, and full. Default: full.
--debug-alignment-html FILE       Output an interactive .html file showing alignment results to the given file.
```

### Naive and Trace MCMC

```bash
tpplc <program> -m mcmc-naive
tpplc <program> -m mcmc-trace
```

The new proposed sample is a complete rerun of the entire simulation.
Those are pedagogical methods that should not be used for real problems.

#### Options available

```bash
--particles INT                   The number of particles (i.e., samples or iterations). The default is 5000
```

### Particle MCMC--Particle independent Metropolis-Hastings (PMCMC-PIMH)

```bash
tpplc <program> -m pmcmc-pimh
```

This is perhaps the simplest version of an SMC-within-MCMC approach, where each proposal in the MCMC is a full set of samples (particles) generated by SMC.

[Reference: Paige 2014](https://proceedings.mlr.press/v32/paige14.pdf).

#### Options available

```bash
--pmcmcParticles INT              The number of particles for the smc proposal computation. The default is 2
--particles INT                   The number of particles (i.e., samples or iterations). The default is 5000
--cps ARG                         Configuration of CPS transformation (only applicable to certain inference algorithms). The supported options are: none, partial, and full. Default: full.
```
