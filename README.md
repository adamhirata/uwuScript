# uwuScript ( ́ ◕◞ε◟◕`)

<p align="center"><img src="docs/images/logo_transparent_background.png" alt="uwuScript logo" width="450"/></p>

## Introduction (づ｡◕‿‿◕｡)づ
uwuScript is a cute scripting language that is designed to be fun (and possibly cringey) to use. Because of the use of adorable emoticons and keywords, you will not only feel cuter, but look cuter by the end of developing your program!❀ This language compiles to Javascript and pulls inspiration from other sugoi すごい languages such as Java's static typing and Swift's for-in loops. uwuScipt also allowed for the programmer to use comments to effectively convey their emotions through various comment emoticons.

uwuScript Website: https://adamhirata.github.io/uwuScript/
grammar: https://github.com/adamhirata/uwuScript/blob/master/syntax/uwuScript.ohm
Presentation Slides: [Presentation Slides](https://docs.google.com/presentation/d/1s8D6IZ10MGerqN5GDT4IIegXw1eyxDTES7N2mcyl28s/edit?usp=sharing "Presentation Slides")

## Features
* Cuteness
* Scripting Language
* Statically Typed
* For-in/While Loops

### Optimizations
* Constant Folding - to compute simple expressions at compiler time
* Strength Reduction - optimizations to reduce cost of more expensive Unary and Binary Operations

### Types
* Boowean/Boow
* Stwing
* Numbwer
* Awway/Aww
* Dictionawy/Dict

### Unary and Binary Operators
* add <code> + </code>
* subtract <code> - </code>
* multiply <code> * </code>
* divide <code> / </code>
* modulo <code> % </code>
* not <code> ! </code>
* negative <code> - </code>
* equality <code> == </code> or <code> != </code>
* less than <code> < </code>
* less than or equal to <code> <= </code>
* greater than <code> > </code>
* greater than or equal to <code> >= </code>

### Declarations
<pre><code>
Numbwer a = 1
Boowean b = a != 1
Boow c = twue;
Stwing d = "this wetter iz c"
Awway&lt;Stwing&gt; e = ["this", "iz", "an", "awway"]
Dictionawy&lt;Numbwer to Stwing&gt; f = {1 to "one", 2 to "two", 3 to "three"}
</code></pre>

### Comments
<pre><code> 
Stwing a = "cute"         (*≧ω≦*) uwu
Stwing b = "give" 	  (づ ◕‿◕ )づ here take this
Stwing c = "happy"        (ﾉﾟ▽ﾟ)ﾉ yay it finally works

(╯°益°)╯彡┻━┻ I hate this table
Where did that table go?      ┻━┻
Nevermind that table was pretty cool ┬─┬ノ( º _ ºノ)
</code></pre>

## Code Examples
* Top is uwuScript
* Bottom is JavaScript

### Max Number
<pre><code>
Numbwer max(Numbwer n, Numbwer m) uwu
	if (n > m) uwu
    	retuwn n
    owo ewse uwu
    	retuwn m
    owo
owo
</code></pre>

<pre><code>
function max(n, m) {
  if (n > m) {
    return n;
  } else {
    return m;
  }
}
</code></pre>

### Factorial
<pre><code>
Numbwer factorial (Numbwer n) uwu
  if (n == 1)  uwu 
    retuwn 1
  owo ewse uwu
    retuwn n * factorial(n - 1)
  owo
 owo
</code></pre>

<pre><code>
function factorial(n) {
    if(n == 0) {
        return 1
    } else {
        return n * factorial(n - 1);
    }
}
</code></pre>

### Bubble Sort
<pre><code>
Aww&lt;Numbwer&gt; bubbleSort(Aww&lt;Numbwer&gt; arr) uwu 
  Numbwer len = length(arr)
  fow i in 0...len uwu 
    fow j in 0...len uwu
      if (arr[j] > arr[j+1]) uwu
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
      owo
    owo
  owo
  retuwn arr
owo
</pre></code>

<pre><code>
function bubbleSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        if (arr[j] > arr[j + 1]) {
 	  [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
        }
      }
  }
  return arr;
};
</pre></code>
### Nested for-in loop
<pre><code>
fow i in 0...10 uwu
  fow j in 0...10 uwu
    pwint(i + j)
  owo
  if (i % 2 == 0) uwu
    aww[i-1] = stwing(i)
  owo
owo
</code></pre>

<pre><code>
for(int i = 0; i <= 10; i++) {
  for(int j = 0; i <= 10; j++) {
    console.log(i + j);
  }
  if (i % 2 == 0) {
    aww[i-1] = i.toString()
  }
}
</code></pre>

### Semantic Errors
* Cannot chain relation operators 

  <code> a < b < c </code>
* Using relation operators on non-numbers

  <code> "a" < "b" </code>
* Using mathematical operators on non-numbers
	
  <code> "a" + "b" </code>
* Using "and" or "or" operators on non booleans

  <code> 1 && 2 </code>
* Using equality operators on expressions of different types

  <code>"1" == 1</code>  
* Assigning a variable to a differently typed expression

  <code>
  Numbwer a = 1
  a = "one"
  </code>
* Declaring a variable with 2 different types

  <code>
  Numbwer a = "one"
  </code>
* Cannot return a different type than specified 

  <code> 
  Aww&lt;Numbwer&gt; a() uwu
    retuwn 1
  owo
  </code>
* Arrays/Dictionaries must be of specified type

  <code>
  Aww&lt;Numbwer&gt; a = ["1"]
  Dict&lt;Numbwer to Stwing&gt; b = {1 to "two", "1" to "two"}
  </code>
* Using break outside of a loop

  <code>
  Numbwer a = 2
  bweak
  </code>
* Incorrect amount or type of function parameters

  <code>
  Numbwer a (Stwing str) uwu retuwn 2 owo
  a(2)
  a(2, "two")
  </code>
* Expression in if statement, while loop, or ternary statement is not a boolean

  <code>
  Stwing a = "twue"
  while (a) uwu
    pwint(a)
  owo
  if (a) uwu
    pwint(a)
  owo
  a ? a = "twue" ewse a = "fawse"
  </code>
