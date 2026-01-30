---
id: distributions
sidebar_position: 8
---

# Distributions

## Continuous distributions

| Usage | Parameters | Support | Wikipedia link |
|----------|----------|----------|----------|
| `Beta(a, b)` | `a` and `b` are Reals | a Real in (0, 1) | [Beta distribution](https://en.wikipedia.org/wiki/Beta_distribution) 
| `Dirichlet(alphas)` | `alphas` is a sequence of Reals | a length-K vector on the simplex (non-negative reals summing to 1) | [Dirichlet distribution](https://en.wikipedia.org/wiki/Dirichlet_distribution) 
| `Exponential(rate)` | `rate` is a Real | a non-negative Real | [Exponential distribution](https://en.wikipedia.org/wiki/Exponential_distribution) 
| `Gamma(shape, scale)` | `shape` and `scale` are positive Reals | a positive Real | [Gamma distribution](https://en.wikipedia.org/wiki/Gamma_distribution) 
| `Gaussian(mean, stdev)` | `mean` and `stdev` are Reals | a Real (-infinity to infinity) | [Normal distribution](https://en.wikipedia.org/wiki/Normal_distribution) 
| `Reciprocal(a, b)` | `a` and `b` are positive Reals | a Real in [a, b] | [Reciprocal distribution](https://en.wikipedia.org/wiki/Reciprocal_distribution) 
| `Uniform(a, b)` | `a` and `b` are Reals | a Real in [a, b] | [Continuous uniform distribution](https://en.wikipedia.org/wiki/Continuous_uniform_distribution) 

## Discrete distributions

| Usage | Parameters | Support | Wikipedia link |
|----------|----------|----------|----------|
| `Bernoulli(prob)` | `prob` is a Real | a Boolean: TRUE or FALSE | [Bernoulli distribution](https://en.wikipedia.org/wiki/Bernoulli_distribution) 
| `Binomial(n, prob)` | `n` is an Integer and `prob` is a Real | an Integer in 0, ..., n | [Binomial distribution](https://en.wikipedia.org/wiki/Binomial_distribution) 
| `Categorical(probs)` | `probs` is a sequence of Reals | an Integer in 0, ..., K-1 (category index) | [Categorical distribution](https://en.wikipedia.org/wiki/Categorical_distribution) 
| `Geometric(prob)` | `prob` is a Real | an Integer in 0, 1, 2, ... (failed trials until first success) | [Geometric distribution](https://en.wikipedia.org/wiki/Geometric_distribution) 
| `Multinomial(n, probs)` | `n` is an Integer and `probs` is a sequence of Reals | a length-K vector of non-negative Integers summing to `n` | [Multinomial distribution](https://en.wikipedia.org/wiki/Multinomial_distribution) |
| `Poisson(rate)` | `rate` is Real | a non-negative Integer | [Poisson distribution](https://en.wikipedia.org/wiki/Poisson_distribution) 