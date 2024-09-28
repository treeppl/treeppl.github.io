# Alignment

For a detailed explanation, consult the [automatic alignment paper by Lunden et al. 2021](https://library.oapen.org/bitstream/handle/20.500.12657/63011/1/978-3-031-30044-8.pdf#page=548).
In a nutshell aligned statements are statements that come in the same order, no matter the random choices that the program has taken.

## In SMC Schemas

Alignment here refers to the likelihood-update statements `weight`, `logWeight`, and `observe`.
Aligned statements are such statements that are not in deterministic code-blocks.

## In MCMC Schemas

Alignment here refers to the sample statement `assume`.
Aligned statements are such statements that are not in deterministic code blocks.