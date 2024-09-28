# Inference

TreePPL supports a continuously growing number of inference schemas.
To define a schema, the user has to select the inference method and options.
To get a complete list of the available methods and options the user can type `tpplc` on the command line, which will provide all supported command-line options.
One can define the schema by issuing a command-line compilation command, or by making the appropriate choices in Python or R.
Please find below a reference list of the supported strategies with an explanation.

## Importance Sampling

```
tpplc -m is-lw
```

This is a basic inference schema.  Not be used for complex algorithm.  Useful for illustrating and understanding probabilistic programming.

## Sequence Monte Carlo (SMC) Methods

TreePPL supports two SMC methods:

  - bootstrap particle filter (BPF), and
  - alive particle filter (APF)

both inference methods have a resampling option.

### Bootstrap Particle Filter (BPF)

```
tpplc -m smc-bpf
```

This is the classical SMC schema.
Except in special cases, the alive particle filter (APF) should be preferred as the BPF can suffer from [path degeneration](../Explanation/path-degeneration.md).

This inference is affected by the resample placement method.

### Alive Particle Filter (APF)

```
tpplc -m smc-apf
```

This is the more advanced SMC schema.
It avoids [path degeneration](../Explanation/path-degeneration.md) by keeping a population of particles alive.

[Reference](https://proceedings.mlr.press/v115/kudlicka20a.html).

### Likelihood resampling

```
tpplc -m smc-bpf --resample likelihood
```

resamples the particles at every `observe`, `weight`, and `logWeight` statement.

### Aligned resampling

```
tpplc -m smc-bpf --resample align
```

resamples the particles after `observe`, `weight`, and `logWeight` statements that are [aligned](../Explanation/alignment.md).

### Manual resampling

```
tpplc -m smc-bpf --resample manual
```

resamples only at the `resample` keyword.  This is the default behavior.

## Markov-chain Monte Carlo (MCMC) Methods

TreePPL supports a range of MCMC methods:

  - lightweight MCMC
  - aligned lightweight MCMC
  - naive and trace MCMC
  - particle MCMC---particle-indendent Metropolis-Hastings

### Lightweight MCMC

This is not as efficient as its aligned version and should be used only for testing.

### Aligned lightweight MCMC

```
tpplc -m mcmc-lightweight --align
```

This is the Markov-chain Monte Carlo (MCMC) schema that should be used in most cases.
Moves are proposed by resampling one `assume` statement at random.
Draws that are [aligned](../Explanation/alignment.md) together with some unaligned draws are reused to save computational effort.
It has an option of whether to do a continuation-passing style transformation in order to avoid recomputation of the likelihood:

```
tpplc -m mcmc-lightweight --cps partial
```

is the default, which should be the most performant. For details, see [Lunden et al. 2024](https://link.springer.com/chapter/10.1007/978-3-031-57267-8_12).

One can also use a full CPS transformation

```
tpplc -m mcmc-lightweight --cps full
```

which is the traditional algorithm, or to turn it off completely

```
tpplc -m mcmc-lightweight --cps none
```

which should not be very efficient.

## Naive and trace MCMC

Those are pedagogical methods that should not be used for real problems.

## PMCMC-PIMG

TODO