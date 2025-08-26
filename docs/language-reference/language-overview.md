# Language overview
  
## Basic features

<div className="language-table">
<table>
<tr><th>Feature</th><th>Example</th></tr>
<tr><td>Single-line comment</td><td><code>// This is a single line comment</code></td></tr>
<tr><td>Multi-line or intervening comment</td><td><code>/* This is a multiline comment, <br />
when more text is needed */</code></td></tr>
<tr><td>Convert integer to string</td><td><code>int2string(n)</code></td></tr>
<tr><td>Convert real to string</td><td><code>real2string(pi)</code></td></tr>
<tr><td>Convert boolean to string</td><td><code>bool2string(true)</code></td></tr>
<tr><td>Convert integer to real</td><td><code>int2real(n)</code></td></tr>
<tr><td>Convert real to integer</td><td><code>real2int(pi)</code></td></tr>
<tr><td>Terminate statements with semi-colon <code>;</code></td><td><code>printLn("Hello, world");</code></td></tr>
</table>
</div>

## Printing and debugging

<div className="language-table">
<table>
<tr><th>Feature</th><th>Example</th></tr>
<tr><td>Print something (real/integer/string) to debug</td><td><code>debug(something)</code></td></tr>
<tr><td>Printing and adding a new line</td><td><code>printLn(text);</code></td></tr>
<tr><td>Printing without adding a new line</td><td><code>print(text);</code></td></tr>
<tr><td>Print only an empty line</td><td><code>print("\n");</code></td></tr>
</table>
</div>

- All types must be converted to string before printing, unless using <code>debug</code>. 
- For reals, only a few decimals will be retained when printed.

## Functions

<div className="language-table">
<table>
<tr><th>Feature</th><th>Example</th></tr>
<tr>
  <td>Creating a function without a return</td>
  <td>
  ```
  function flip(datapoint: Bool, probability: Real) {
    observe datapoint ~ Bernoulli(probability);
  };
  ```
      </td>
</tr>
<tr>
  <td>Creating a function with a return</td>
  <td>
  ```
  function flip(datapoint: Bool, probability: Real) => Real {
    observe datapoint ~ Bernoulli(probability);
    return probability;
  }
  ```
  </td>
</tr>
<tr><td>Conditional (if/else statement)</td><td><code>if (condition) &#123; execute_when_true &#125; else &#123; execute_when_false &#125;</code></td></tr>
<tr><td>Loop (for statement)</td><td><code>for i in 1 to n &#123; ... &#125;</code></td></tr>
</table>
</div>

- A function needs to specify its input parameters and their types.
- A function can have zero input parameters.
- A function needs to specify its return parameters and their types, if there is a return.
- A function may return nothing via <code>return;</code> or have no return statement at all.
- The <code>return</code> statement may appear within a <code>for</code> or an <code>if</code>.
- The only effects that a function can have are changing the likelihood, printing things, and returning an output.
- Looping allows for limited side-effects.

## Working with scalar data

<div className="language-table">
<table>
<tr><th>Feature</th><th>Example</th></tr>
<tr><td>The basic datatypes are integer, real, boolean, and string</td><td><code>42</code> (integer), <code>3.14</code> (real), <code>true</code> or <code>false</code> (boolean), <code>"hello"</code> (string)</td></tr>
<tr><td>Arithmetic on numbers</td><td><code>2.0 + 3.0</code>,  <code>2.0 - 3.0</code>,  <code>2.0 * 3.0</code>,  <code>2.0 / 3.0</code></td></tr>
<tr><td>Comparisons (return booleans)</td><td><code>2.0 &lt; 3.0</code>, <code>2.0 &lt;= 3.0</code>, <code>2.0 == 3.0</code>, <code>2.0 &gt;= 3.0</code>, <code>2.0 &gt; 3.0</code></td></tr>
<tr><td>Boolean logic, AND (true if both are true)</td><td><code>a &amp;&amp; b</code></td></tr>
<tr><td>Boolean logic, OR (true if one is true)</td><td><code>a || b</code></td></tr>
<tr><td>Boolean logic, NOT (negates)</td><td><code>!a</code></td></tr>
<tr><td>Explicit numeric conversion before comparing</td><td><code>Real(n) &gt; 5.0</code></td></tr>
</table>
</div>


## Working with sequences and matrices

<div className="language-table">
<table>
<tr><th>Feature</th><th>Example</th></tr>
<tr><td>Joining with <code>paste0</code> (no separator)</td><td><code>paste0(["espresso", "macchiato"])</code> returns <code>"espressomacchiato"</code></td></tr>
<tr><td>Joining with <code>paste</code> (defining separator)</td><td><code>paste(["espresso", "macchiato"], " ")</code> returns <code>"espresso macchiato"</code></td></tr>
<tr><td>Creating a new sequence</td><td><code>let testSeq = [1, 2];</code> will create a sequence of integers with length 2</td></tr>
<tr><td>Getting the i-th element of the sequence (sequences are 1-indexed)</td><td><code>testSeq[1]</code></td></tr>
<tr><td>Getting the length of a sequence</td><td><code>length(testSeq)</code></td></tr>
<tr><td>Applying a function to each element of a sequence</td><td><code>let strSeq = apply(bool2string, boolSeq);</code></td></tr>
<tr><td>Creating a new matrix</td><td><code>let testMat = mtxCreate(2, 2, [1, 2, 3, 4]);</code> creates a matrix with dimensions 2x2</td></tr>
</table>
</div>

- The basic datatypes are integer, real, boolean, and string. Each of them can be converted to a sequence by <code>[]</code>.
- It is not possible to change individual elements. For example: <code>let testSeq[1] = x;</code> <em>// compiler error!</em>

## Probabilistic programming

<div className="language-table">
<table>
<tr><th>Feature</th><th>Example</th></tr>
<tr>
  <td>A model function is needed by every program.<br />
  It specifies the probabilistic model.</td>
  <td>
  ```
  model function coinModel(coinflips: Bool[]) => Real[] {
    // specify prior
    // condition the likelihood on data
    // return posterior
  };
  ```
</td>
</tr>
<tr><td>Use the <code>assume</code> keyword to sample form a prior <br /> 
distribution (here using the Beta distribution)</td><td><code>assume p ~ Beta(a, b);</code></td></tr>
<tr><td>Use the <code>observe</code> keyword to condition the likelihood <br /> 
on observed data (here using the Beta distribution)</td><td><code>observe data ~ Beta(a, b);</code></td></tr>
<tr><td>To manipulate the likelihood directly use <code>weight</code></td><td><code>weight(lik);</code></td></tr>
<tr><td>or <code>logWeight</code> on the logarithmic scale</td><td><code>logWeight(lik);</code></td></tr>
<tr><td>The posterior is the returned value of the <br />  model function over one or more parameters </td><td><code>return p;</code></td></tr>
</table>
</div>


