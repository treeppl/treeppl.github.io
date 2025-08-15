# Cheat sheet
  
## Basic features

| Feature | Example |
|----------|----------|
| Single-line comment | `// This is a single line comment`  |
| Multi-line or intervening comment | `/* This is a multiline comment, when more text is needed */`    |
| Convert integer to string | `int2string(n)`|
| Convert real to string| `real2string(pi)`|
| Convert boolean to string | `bool2string(true)`|
| Convert integer to real | `int2real(n)`|
| Convert real to integer| `real2int(pi)`|
| Terminate statements with semi-colon `;` | `printLn("Hello, world");` |

## Printing and debugging

| Feature | Example |
|----------|----------|
| Print something (real/integer/string) to debug | `debug(something)` |
| Priting and adding a new line | `printLn(text);` |
| Printing without adding a new line | `print(text);` |
| Print only an empty line | `print("\n");` |

- All types must be converted to string before printing, unless using `debug`. For reals, only a few decimals will be retained when printed.

## Functions

| Feature | Example |
|----------|----------|
| Creating a function without a return | `function flip(datapoint: Bool, probability: Real) {`   
|| `observe datapoint 	~ Bernoulli(probability);` 
|| `}` |
| Creating a function with a return | `function flip(datapoint: Bool, probability: Real)=> Real {`   
|| `observe datapoint 	~ Bernoulli(probability);` 
|| `return probability;`
|| `}` |
| Conditional (if/else statement) | `if (condition) { execute_when_true } else { execute_when_false }` |
| Loop (for statement) | `  for i in 1 to n { ... } ` |


- A function needs to specify its input parameters and their types.
- A function can have zero input parameters.
- A function needs to specify its return parameters and their types, if there is a return.
- A function may return nothing via `return;` or have no return statement at all.
- The `return` statement may appear within a `for` or an `if`.
- The only effects that a function can have are changing the likelihood, printing things, and returning an output.
- Looping allows for limited side-effects.

## Working with scalar data

| Feature | Example |
|----------|----------|
| The basic datatypes are integer, real, boolean, and string | `42` (integer), `3.14` (real), `true` or `false` (boolean), "hello" (string) |
| Arithmetic on numbers | `2.0 + 3.0`,  `2.0 - 3.0`,  `2.0 * 3.0`,  `2.0 / 3.0` |
| Comparisons (return booleans) | `2.0 < 3.0`, `2.0 <= 3.0`, `2.0 == 3.0`, `2.0 >= 3.0`, `2.0 > 3.0` |
| Boolean logic, AND (true if both are true) | `a && b` |
| Boolean logic, OR (true if one is true)  |   `a \|\| b` |
| Boolean logic, NOT (negates) |  `!a`|
| Explicit numeric conversion before comparing | `Real(n) > 5.0` |


## Working with sequences and matrices

| Feature | Example |
|----------|----------|
| Joining with `paste0` (no separator) | `paste0(["espresso", "macchiato"], " ")` returns `"espressomacchiato"` |
| Joining with `paste` (defining separator) | `paste(["espresso", "macchiato"], " ")` returns `"espresso macchiato"` |
| Creating a new sequence | `let testSeq = [1, 2]; // will create a sequence of integers with length 2` |
| Getting the i-th element of the sequence (sequences are 1-indexed) | `testSeq[1]` |
| Getting the length of a sequence | `length(testSeq)` | 
| Applying a function to each element of a sequence | `let strSeq = apply(bool2string, boolSeq);` |
| Creating a new matrix | `let testMat = mtxCreate(2, 2, [1, 2, 3, 4,]); //creates a matrix with dimensions 2x2` |

- The basic datatypes are integer, real, boolean, and string.  Each of them can be converted to a sequence by `[]`
- It is not possible to change individual elements. For example: `let testSeq[1] = x; // compiler error!` 


## Probabilistic programming

| Feature | Example |
|----------|----------|
| A model function is needed by every program. It specifies the probabilistic model. | `model function coinModel(coinflips: Bool[]) => Real  {` 
||  `// specify prior` 
|| `// condition the likelihood on data` 
||`// return posterior` 
||`}`|
| Use the `assume` keyword to sample form a prior distribution (here using the Beta distribution) | `assume p ~ Beta(a, b);`  |
| Use the `observe` keyword to condition the likelihood on observed data (here using the Beta distribution) | `observe data ~ Beta(a, b);` |
| To manipulate the likelihood directly use `weight` | `weight(lik);` | 
| or `logWeight` on the logarithmic scale | `logWeight(lik);` | 
| The posterior is the returned value of the model function | `return p;` |



