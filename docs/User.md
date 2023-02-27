---
sidebar_position: 3
id: user
---

# Language Overview

TreePPL is a universal probabilistic programming language with mostly functional semantics.

  - We support stochastic branching and stochastic recusion.
  - Function side-effects are only changing the weights and printing.
  - We terminate statements with `;`.

Every TreePPL program is a _file_ with the extension `.tppl`.
A file needs to contain one more _declrations_ and may C/C++ style comments
(`//` or `/* */`).

## Declarations

A declaration can be a _function declaration_, a _model function declaration_, or a _type declaration_.

### Functions and models

```{tppl title="Example: function declaration"}
model function flip(p: Real): Bool {
	// Statements in the function body
}
```

  - A function declaration is a top-level construct in a TreePPL file (for now nested functions are not supported).
  - `model` is optional and indicates the entry-point in our program (for input and output).
  - The argument types are necessary, the return type is not necessary, if it can be inferred.
  - The body of each function contains one or more statements, which can be
  deterministic or probabilistic.

### Types

```{tppl title="Example: type declaration"}
type SpecTree =
  | Node {left : SpecTree, right : SpecTree, age : Real}
  | Leaf {age : Real}
```

  - In the example `Node { ... }` and `Leaf { ... }` are constructors; constructors are capitalized.
  - Types can be polymorphic (possibly constructed by different constructors).
  - Types can be recursive.

## Expressions

  - Arithmetic expressions: `+`, `-`, `/`, `*` (infix)
  - Boolean expressions: `>`, `<`, `<=`, `>=`, `==`, `!=`, `is` (infix)
  - Function calls
  - Iterators: `to`
  - Parenthesis are used for grouping and function calls.
  - Function calls have higher precedence than multiplication and division, which have a higher precedence than addition and subtraction.
  - If there is anbiguity in precedence, an error will be produced by the compiler, and parenthesis have to be used.

### Is-expression

The is-expression can be used to check if a given thing on the left side of it matches a particular constructor (useful with polymorphic and recursive types):

```{tppl title="Example: is-expression"}
if tree is Node {
  // process the Node case
```

### To expression

:::caution
Not implemented, used to define a range over integers. Useful inside for loops.
:::


## Regular (deterministic) statements

### Expression statement (pure function call)

```{tppl title="Example: expression statement"}
flip(0.5);
```

  - Expression statements are used to call a function.  Since the return value is not saved, only side-effects in the invoked function, i.e. `observe` statements have any purpose/

### Assignment statement

```{tppl title="Example: let statement"}
let nextAge = age - split;
```

  - The assignement or `let` statement assigns a value to a name (deterministically).
  You can think of it as a constant, but we are allowed to re-assign a new value
  to the same name later on.

### If-else-statement

```{tppl title="Example: if-statement"}
if a <= b {
  return a;
} else {
  return b;
}
```

  - The condition of the if-statement must be an expression.
  - It is pointness to assign a value via `let` in the if-statement and try to use after its scope, as the binding will be lost.
  - You would ideally want to return from the if-statement, or have some side-effect.
  - Parenthesis are not needed around the condition.
  - You can nest if-statements.
  - Returning from if-statements is encouraged.

### Return statement

```{tppl title="Example: return statement"}
function min(a: Real, b: Real): Real {
  if a <= b {
    return a;
  }
  return b;
}

let t = min(a, b)
```

  - It is optional as a function can be there purely for side-effects.
  - No value will be returned if there is no `return` statement.

### For loop

:::caution
Unsupported right now
:::

## Probabilistic statements

### Assume statement

```{tppl title="Example: assume statement"}
assume rate ~ Gaussian(0, 1);
```

  - The `assume` statement defines a random variable from a given distribution.

### Observe (conditioning statement)

```{tppl title="Example: observe statement"}
observe 0 ~ Poisson(rate * duration);
```

### Weight (conditioning stament)

```{tppl title="Example: weight statement"}
weight 2;
```

:::danger
The `weight` statement in TreePPL does not presume that the weight you are providing is on the log scale.  Even though, the internal representation of the particles weight is logarithmic, the compiler will apply the `log` transformation ot the weight.
:::

There is an equivalence between `observe` and `weight`.
For instance

```{tppl title="Example: equivalence of observe and weight"}
observe 0 ~ Exponential(lambda);
//is equivalent to
weight(exp(lambda));
```

## Built-in distributions

  - `Bernouilli(prob)`
  - `Exponential(rate)`
  - `Gamma(shape, scale)`

## Working with Data

:::caution
Work-in-progress
:::

```{mcore title="Handling JSON"}
let input = "{\"p\": 0.5}"

let data: {p: Float} =
  let parsed: JsonValue = jsonParseExn input in
  match parsed with JsonObject properties then
    let p: JsonValue = mapFindOrElse (lam. error "missing p property")
                                     "p"
                                     properties
    in
    match p with JsonFloat f then
      {p = f}
    else
      error "p is not a float"
  else
    error "not an object at top level"
```

The following sacrifices some error message for cleaner code. I.e. if we had access to a function such as jsonGetIntExn which converts a JsonValue to an Int, and exits if it isn't an Int, then we could convert JSON objects into records in a much cleaner fashion:

```{mcore title="Handling JSON"}
include "json.mc"
include "map.mc"

type MyParams = {
    a: Int,
    b: [Int],
    c: {
        x: Float,
        y: Bool,
        z: [Float]
    }
}

mexpr

let s: String = "{
    \"a\": 5,
    \"b\": [1,2,3,4],
    \"c\": {
        \"x\": 5.0,
        \"y\": true,
        \"z\": [0.1, 1.0]
    }
}" in

let json2MyParamsExn: JsonValue -> MyParams = lam v.
    let ps_top = jsonGetObjectExn v in
    {
      a = jsonGetIntExn (mapFindExn "a" ps_top),
      b = map jsonGetIntExn (jsonGetArrayExn (mapFindExn "b" ps_top)),
      c = let ps_c = jsonGetObjectExn (mapFindExn "c" ps_top) in
          {
            x = jsonGetFloatExn (mapFindExn "x" ps_c),
            y = jsonGetBoolExn (mapFindExn "y" ps_c),
            z = map jsonGetFloatExn (jsonGetArrayExn (mapFindExn "z" ps_c))
          }
    }
in

let params: MyParams = json2MyParamsExn (jsonParseExn s) in

-- the values of the decoded parameters
utest params with {
  a = 5,
  b = [1, 2, 3, 4],
  c = {
    x = 5.0,
    y = true,
    z = [0.1, 1.0]
  }
} in

...
```
