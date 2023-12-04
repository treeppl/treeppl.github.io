# TreePPL Style Guide

:::warning

This Style Guide is **under construction** .

:::

The goal of this guide is to help users write code that easy to understand and compare to other TreePPL code. 


## Naming convention
We advise snake_case over CamelCase.


## Statements
There should only be one statement per line, terminated by a semi-colon. 


## Whitespace
A single blank line can be used to separate functions and optionally to separate groups of statements. Several blank lines are not encouraged. 

For clarity, we advise to always include spaces around operators.


## Indentation
When a new block is opened, the indentation should increase by two spaces for the duration of the block.


## Curly braces
Curly braces are needed when writing functions, as well as in e.g. `for` and `if`. We advise to put the opening curly brace on the first line, and the closing brace on a separate, final, line. The first statement within the braces should have its own line. 

Example:

```bash
model function hello() : () { 
  printLn("Hello, world!");
}
```

## Comments
Single-line comments are inserted after a double forward slash:  `// `. 

Multi-line or intervening comments are inserted with a forward slash and asterisk at the start and by an asterisk and forward slash at the end: `/* ... */ `




