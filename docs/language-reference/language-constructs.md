# Language constructs
  
## Basic features and printing

| Feature | Implementation |
|----------|----------|
| Single-line comment | `// This is a single line comment`  |
| Multi-line or intervening comment | `/* This is a multiline` |
|                     | `   comment */`                     |
| Terminate statements with semi-colon `;` | `printLn("Hello, world");` |
| Priting and adding a new line | `printLn(text);` |
| Printing without adding a new line | `print(text);` |
| Print only an empty line | `print("\n");` |
| Convert integer to string, for example to print | `int2string(n)`|
| Convert real to string, for example to print | `real2string(pi)`|
| Convert boolean to string, for example to print| `bool2string(true)`|

- All types must be converted to string before printing. For reals, only a few decimals will be retained.

## Functions

| Feature | Implementation |
|----------|----------|
| Creating a function | `function flip(datapoint: Bool, probability: Real) {` |
| |  ` observe datapoint ~ Bernoulli(probability);`|
| | `}` |

- A function needs to specify its input parameters and their types.
- A function can have zero input parameters.
- The only effects that a function can have are changing the likelihood, printing things, and returning an output.
- A function may return nothing via `return;` or have no return statement at all.
- The `return` statement may appear within a `for` or an `if`.

## Working with data

| Feature | Implementation |
|----------|----------|
| Concatenating two strings | `concat("Trump was elected: ", bool2string(trump)` Outputs `False` |
| Creating a new vector | `let testVec = [1, 2]; // will create an integer vector` |
| Getting the i-th element of the vector | `testVec[1]` vectors are 1-indexed |
| Getting the length of a vector | `length(testVec)` | 
| Applying a function to each element of a vector | `let coinFlipStr = apply(bool2string, coinflips);` |
| Joining a vector of strings into a single string | `join(coinFlipStr)` |
| Arithmetic operations on reals |  `2.0 + 3.0`, `2.0 * 3.0`, `2.0 / 3.0`, `2.0 - 3.0` |
| Boolean operations on reals |  `2.0 < 3.0`, `2.0 <= 3.0`, `2.0 == 3.0`, `2.0 >= 3.0`, `2.0 > 3.0` |
| Boolean operations on booleans |   `true && false` logical AND|
| | `true` 	&#124;&#124; `false` logical OR |
| | `!false` logical NOT|
| Checking if something is true | `if /* condition */ { ` | 
| Integers need to be converted to reals before comparing | `Real(i) > 5.0` |

- The basic datatypes are integer, real, boolean, and string.  Each of them can be converted to a vector by `[]`
- It is not possible to change individual elements. For example: `let testVec[1] = x; // compiler error!` 
- Looping allows for limited side-effects.

## Probabilistic programming

| Feature | Implementation |
|----------|----------|
| A model function is needed by every program. It specifies the probabilistic model. | `model function coinModel(coinflips: Bool[]) => Real  {` |
| | `// specify prior` |
||  `// condition the likelihood on data` |
||  `// return posterior` |
|| `}`|
| Use the `assume` keyword to sample form a prior distribution (here using the Beta distribution) | `assume p ~ Beta(a, b);`  |
| Use the `observe` keyword to condition the likelihood on observed data (here using the Beta distribution) | `observe data ~ Beta(a, b);` |
| To manipulate the likelihood directly use `weight` | `weight(lik);` | 
| or `logWeight` on the logarithmic scale | `logWeight(lik);` | 
| The posterior is the returned value of the model function | `return p;` |


