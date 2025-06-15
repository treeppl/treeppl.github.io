# Style Guide

:::warning

This Style Guide is **under construction**.

:::

The goal of this guide is to help users write consistent code that easy to understand and compare to other TreePPL code. 





## Statements
There should only be one statement per line, terminated by a semi-colon. 

### Do
```js
let a = 1.0;
let b = 2.0;
let c = a * b; 
```

### Don't
```js
let a = 1.0; let b = 2.0;
let c = a * b; 
```

## Whitespace
A single blank line can be used to separate functions and optionally to separate groups of statements. Several blank lines are not encouraged. 
For clarity, we advise to always include spaces around operators.

### Do
```js
let c = a * b; 
```

### Don't
```js
let c = a*b; 
```

## Indentation
When a new block is opened, the indentation should increase by two spaces for the duration of the block.

### Do
```js
model function hello() : () { 
  printLn("Hello, world!");
}
```

### Don't

```js
model function hello() : () { 
printLn("Hello, world!");
}
```


## Curly braces
Curly braces are needed when writing functions, as well as in e.g. `for` and `if`. We advise to put the opening curly brace on the first line, and the closing brace on a separate, final, line. 

### Do
```js
model function hello() : () { 
  printLn("Hello, world!");
}
```

### Don't

```js
model function hello() : () 
{ 
  printLn("Hello, world!"); }
```


## Comments
Single-line comments are inserted after a double forward slash:  `// `. 

Multi-line or intervening comments are inserted with a forward slash and asterisk at the start and by an asterisk and forward slash at the end: `/* ... */ `

### Do

```js
// creating my test vector, length = 2
let my_vec = [1, 2]; 
```

### Don't
```js
// creating my test vector
// length = 2
let my_vec = [1, 2]; 
```



