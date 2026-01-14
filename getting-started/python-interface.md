---
layout: default
title: Python interface
---
# Python interface

This page walks you through creating, compiling, and running a TreePPL model in Python.
We’ll use a simple coin-flipping example to illustrate the basic concepts.

To access the core functionality, including creating models and running inference, import the TreePPL package:
```python
import treeppl
```

TreePPL models can be defined inline as a string or stored in a separate file.
To create a model in Python using inline source code:
```python
coin_source = """\
model function coin(outcomes: Bool[]) => Real {
  assume p ~ Beta(2.0, 2.0);
  for i in 1 to (length(outcomes)) {
    observe outcomes[i] ~ Bernoulli(p);
  }
  return(p);
}
"""
coin = treeppl.Model(source=coin_source)
```

If your model is in a file, for example `coin.tppl`, use the `filename` parameter instead:
```python
coin = treeppl.Model(filename="coin.tppl")
```
Remember to include the correct path if the file is not in the current directory.

Useful parameters of `treeppl.Model`:

- `source`: Source code of a TreePPL model
- `filename`: Name of the TreePPL model file
- `method`: Inference method to be used (default `smc-bpf`)
- `samples`: Number of samples to be collected (default 1000)
- Any additional named parameters will be passed as additional arguments to the TreePPL compiler `tpplc`.
  For example, `stack_size=10000` will add `--stack-size 10000` to the arguments of `tpplc`.

Creating a `treeppl.Model` automatically compiles the model’s source code.
If no errors appear, compilation succeeded.

To run inference, call the model with named arguments matching the model function's parameters:
```python
result = coin(outcomes=[True, False, True, True, False])
```

If parameter names clash with Python keywords (e.g. `lambda`), pass them via a dictionary:
```python
kwargs = {"outcomes": [True, False, True, True, False]}
result = coin(**kwargs)
```

Calling the model performs inference using the chosen method and collects the samples.

The result is a `treeppl.InferenceResult` object with the following properties:

- `.samples`: List of sampled values
- `.weights`: Log-weights corresponding to each sample
- `.nweights`: Normalized weights
- `.norm_const`: Logarithm of the marginal likelihood.

If the model function returns multiple values (e.g., `return [lambda, mu]`), we can extract them with `.items`:
```python
lambdas = result.items(0)
mus = result.items(1)
```

The results can be further processed and visualized in Python.
For example, to visualize the posterior distribution of the coin bias using Seaborn, run:
```python
import seaborn as sns

sns.histplot(x=result.samples, weights=result.nweights, bins=100, stat="density", kde=True)
```

The TreePPL package stores compiled models and input files in temporary directories that are deleted when the program exits.
To enforce cleanup immediately after inference, use a context manager (`with`):
```python
with treeppl.Model(filename="coin.tppl", samples=10000) as coin:
    result = coin(outcomes=[True, False, True, True, False])
print(result.norm_const)
sns.histplot(x=result.samples, weights=result.nweights, bins=100, stat="density", kde=True)
```
The temporary files are automatically deleted when the `with` block ends.
