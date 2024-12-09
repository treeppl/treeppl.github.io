# TreePPL Cheat Sheet
  
## Basic features

Example is [Hello world](#hello-world).

| Feature | Implementation |
|----------|----------|
| Single-line comment | `// This is a single line comment`  |
| Multi-line or intervening comment | `/* This is a multiline/intervening` |
|                     | `   comment */`                     |
| Terminate statements with semi-colon `;` | `printLn("Hello, world");` |
| Every program needs to have a model function   | `model function hello() { /* put your code here */ }` |
| Compiling TreePPL code to binary | `tpplc hello.tppl input.mc output.mc && mi compile output.mc` |
| Running compiled programs | `./output [number of particles] [number of sweeps]` |
| | `[number of samples] [number of chains]` in the case of MCMC |

## Working with data

Example is [Blub](#blub).

| Feature | Implementation |
|----------|----------|
| Data is passed by specifying arguments to the model function | `model function blub(n: Int, pi: Real, trump: Bool, coinflips: Bool[], text: String)` |
| | The basic datatypes are integer, real, boolean, and string.  Each of them can be converted to a vector by `[]`. |
| Priting and adding a new line | `printLn(text);` |
| Printing without adding a new line | `print(text);` |
| Print only an empty line | `print("\n"); // printLn() not allowed` |
| All types must be converted to string before printing | `int2string(n)`|
| | `real2string(pi)` will only take a few decimals|
| | `bool2string(true)`|
| Concatenating two strings | `concat("Trump was elected: ", bool2string(trump)` Outputs `False` |
| Creating a new vector | `let testVec = [1, 2]; // will create an integer vector` |
| Getting the i-th element of the vector | `testVec[1]` vectors are 1-indexed |
| It is not possible to change individual elements | `let testVec[1] = x; // compiler error!` |
| Getting the length of a vector | `length(coinflips)` | 
| Applying a function to each element of a vector | `let coinFlipStr = apply(bool2string, coinflips);` |
| Joining a vector of strings into a single string | `join(coinFlipStr)` |
| Arithmetic operations on reals |  `2.0 + 3.0`, `2.0 * 3.0`, `2.0 / 3.0`, `2.0 - 3.0` |
| Boolean operations on reals |  `2.0 < 3.0`, `2.0 <= 3.0`, `2.0 == 3.0`, `2.0 >= 3.0`, `2.0 > 3.0` |
| Boolean operations on booleans |   `true && false` logical AND|
| | `true` 	&#124;&#124; `false` logical OR |
| | `!false` logical NOT|
| Checking if something is true | `if /* condition */ { ` | 
| &nbsp&nbsp only likelihood state has outside effect | `// True statements` |
| &nbsp&nbsp the else part is optional | `} else {`|
| &nbsp&nbsp we can return from `if` or `for` | `// False statements` |
| | `}` |
| Integers need to be converted to reals before comparing | `Real(i) > 5.0` |
| Looping allows for limited side-effects | `for i in 1 to 10 { /* statements for i */}`| 

## Functions

Example is [Is a coin fair?](#is-a-coin-fair)

| Feature | Implementation |
|----------|----------|
| Creating a function | `function flip(datapoint: Bool, probability: Real) {` |
| |  ` // statements `|
| | `// optional return` |
| | `}` |

- A function needs to specify its input parameters and their types.
- A function can have zero input parameters.
- The only effects that a function can have are changing the likelihood, printing things, and returning an output.
- A function may return nothing via `return;` or have no return statement at all.
- The `return` statement may appear within a `for` or an `if`.

## Probabilistic programming

Example is [Is a coin fair?](#is-a-coin-fair)

| Feature | Implementation |
|----------|----------|
| The model function specifies our probabilistic model | `model function coinModel(/* data */) { ` |
| | `// specify prior` |
||  `// condition the likelihood on data` |
||  `// return posterior` |
|| `}`|
| Use the `assume` keyword to sample form a prior distribution | `assume p ~ Beta(a, b);`  |
| | `assume x ~ Exponential(rate);` |
| | `assume y ~ Gamma(shape, scale);` |
| | `assume w ~ Gaussian(mean, stdDev);` |
| | `assume v ~ Bernoulli(prob);` | 
| Use the `observe` keyword to condition the likelihood on observed data | `observe data ~ Beta(a, b);` |
| | `observe data ~ Exponential(a, b);` |
| | `observe data ~ Gamma(shape, scale);` |
| | `observe data ~ Gaussian(shape, scale);` |
| | `observe data ~ Bernoulli(prob);` | 
| To manipulate the likelihood directly use `weight` | `weight(lik); // lik is not on the logartihmic scale` | 
| or `logWeight` | `logWeight(lik); // lik is on the logarithmic scale` | 
| The posterior is the returned value of the model function | `return p; // If the likelihood was not manipulated it will be exactly the prior` |


## Examples

### Hello world

Let's write our first program.  

```js
/*
 * File: hello.tppl
 * Description: Hello, world! Our first program.
 * Compilation:
 *   tpplc models/lang/hello.tppl models/data/standard.mc out.mc && mi compile out.mc
 * Execution: ./out 1 1
 */

/*
 * Model function
 * Parameters: none
 * Returns: nothing
 * Side-effect: prints "Hello, world!"
 */
model function hello() { 
  printLn("Hello, world!")
}
```

For convenience this program can be found under `models/lang/hello.tppl`.  Since our program has no input, we only need to include `models/data/empty.mc`.  It does not initalize data but does include the standard library.

Compile and run:

```bash
$ tpplc models/lang/blub.tppl models/data/examples.mc out.mc && mi compile out.mc
mi compile out.mc
./out 1 1
```
```
$ ./out 1 1
Hello, world!
0.
() 0.
```

The program displays the string "Hello, world!", followed by the normalizing constant and by samples from the described distributions, which are both 0, as the model does nothing but print "Hello, world!".

### Blub

In this blub, we will show how we can pass data to our model and do some operations on it.

```js
/*
 * File: blub.tppl
 * Description: Program to showcase data manipulation.
 * Compilation:
 *   tpplc models/lang/blub.tppl models/data/examples.mc out.mc && mi compile out.mc
 * Execution: ./out 1 1
 */

/*
 * Model function
 * Parameters:
 *   n: Int
 *   pi: Real
 *   trump: Bool
 *   coinflips: Bool[]
 *   text: String
 * Returns: nothing
 * Side-effect: prints things
 */
model function blub(n: Int, pi: Real, trump: Bool, coinflips: Bool[], text: String) {
  print(text);

  printLn(int2string(n));
  printLn(real2string(pi)); // will print only a few decimals
  printLn(bool2string(true));

  printLn(concat("Trump was elected: ", bool2string(trump)));

  let testVec = [1, 2];
  printLn(int2string(testVec[1]));
  printLn(int2string(testVec[2]));

  let coinFlipStr = apply(bool2string, coinflips);
  printLn(concat("The length of the vector is ", int2string(length(coinflips))));
  let y = join(coinFlipStr); //cannot use concat on more than two argumnets
  printLn(y);

  printLn(real2string(2.0 + 3.0));
  printLn(real2string(2.0 * 3.0));
  printLn(real2string(2.0 / 3.0));
  printLn(real2string(2.0 - 3.0));

  printLn(bool2string(2.0 < 3.0));
  printLn(bool2string(2.0 <= 3.0));
  printLn(bool2string(2.0 == 3.0));
  printLn(bool2string(2.0 >= 3.0));
  printLn(bool2string(2.0 > 3.0));

  printLn(bool2string(true && true));
  printLn(bool2string(true && false));
  printLn(bool2string(false && true));
  printLn(bool2string(false && false));

  printLn(bool2string(true || true));
  printLn(bool2string(true || false));
  printLn(bool2string(false || true));
  printLn(bool2string(false || false));

  printLn(bool2string(!false));
  printLn(bool2string(!true));

  for i in 1 to 10 {
    if Real(i) > 5.0 {
      print("\n"); // cannot use printLn() as a nullary function
      printLn(join([int2string(i), " is more than ", real2string(5.0)]));
      return;
    } else {
      print(".");
    }
  }
}
```

For convenience this program can be found under `models/lang/blub.tppl`.  The input is predifined in `models/data/examples.mc`, which also includes the standard library.

Compile and run:

```bash
$ tpplc models/lang/blub.tppl models/data/examples.mc out.mc && mi compile out.mc
mi compile out.mc
$ ./out 1 1
```
```
blab

blab
7
3.14159265359
True
Trump was elected: False
1
2
The length of the vector is 20
TrueTrueTrueFalseTrueFalseFalseTrueTrueFalseFalseFalseTrueFalseTrueFalseFalseTrueFalseFalse
5.
6.
0.666666666667
-1.
True
True
False
False
False
True
False
False
False
True
True
True
False
True
False
......
6 is more than 5.
0.
() 0.
```

First time we printed `blab` we have two new lines, because the string itself contains the newline character `\n`.  Only a few digits of `pi` are printed.  We end with a normalizing constant and an empty sample.

### Is a coin fair?

This is a true _probabilistic_ program, illustrating sampling from the prior, conditioning the likelihood on observed data, and statistical inference.

```js
/*
 * File: coin.tppl
 * Description: Simplest meaningful probabilistic program. Evaluates how likely it is that a coin is fair, given data.
 * Compilation:
 *   tpplc models/lang/coin.tppl models/data/examples.mc out.mc && mi compile out.mc
 * Execution: ./out 100 1
 */

/**
 * Conditions the likelihood of the computation 
 *   on an observed datapoint to come from a particular Bernoulli experiment 
 * Parameters:
 *   datapoint: Real
 *   probability: Real in (0, 1), the probability of True in the Bernoulli experiment
 * Returns: nothing
 * Side-effects: reweighs the computation
 */
function flip(datapoint: Bool, probability: Real) {
  observe datapoint ~ Bernoulli(probability);
}

/*
 * Model function
 * Data:
 *   coinflips: Bool[]
 * Prior: 
 *   p ~ Beta(2, 2)
 * Posterior:
 *   p | coinflips
 */
model function coinModel(coinflips: Bool[]) {
  assume p ~ Beta(2.0, 2.0); // prior
  let n = length(coinflips);
  for i in 1 to n {
    flip(coinflips[i], p); // likelihood
  }
  return(p); // posterior
}
```

During compilation we can select which inference method to use.  The supported methods are: 
 - `-m is-lw`: lightweight importance sampling,
 - `-m smc-bpf`: sequential Monte Carlo with bootstrap particle filter,
 - `-m smc-apf`: sequential Monte Carlo with alive particle filter,
 - `-m mcmc-lightweight`: lightweight Markov-chain Monte Carlo,
 - `-m mcmc-trace`: trace Markov-chain Monte Carlo,
 - `-m mcmc-naive`: naive Markov-chain Monte Carlo,
 - `-m pmcmc-pimh`: particle MCMC - particle-independent Metropolis-Hastings.
 
 Default is `is-lw`.  For additional help run `tpplc` without arguments.
