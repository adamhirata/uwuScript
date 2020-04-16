# uwuScript ( ́ ◕◞ε◟◕`)

<p align="center"><img src="./images/logo_transparent_background.png" alt="uwuScript logo" width="450"/></p>

## Introduction (づ｡◕‿‿◕｡)づ
uwuScript is a cute scripting language that is designed to be fun (and possibly cringey) to use. Because of the use of adorable emoticons and keywords, you will not only feel cuter, but look cuter by the end of developing your program!❀ This language compiles to Javascript and pulls inspiration from other sugoi すごい languages such as Java's static typing and Swift's for-in loops. uwuScript also allows the user to more effectively convey their emotions through comments due to the various comment emoticons!

This language was born out of the need to make programming in groups more enjoyable. It makes reading code out loud in groups funny and goofy. If you don't believe us, try reading some of the example programs out loud (including all of the uwus and owos)! Of course, the user is expected to use what we are going to call "uwu case" where all identifier names are typed in a cute fashion wherever possible. 

Visit our GitHub page here: https://github.com/adamhirata/uwuScript

## Features
* Cuteness
* Scripting Language
* Statically Typed
* For-in/While Loops

## Code Examples
* Top is uwuScript
* Bottom is JavaScript

### Max Number
<pre><code>
Numbwer mwax(Numbwer n, Numbwer m) uwu
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
Numbwer factoiwal (Numbwer n) uwu
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
Aww&lt;Numbwer&gt; bubbuwSwort(Aww&lt;Numbwer&gt; aww) uwu 
  Numbwer len = length(aww)
  fow i in 0...len uwu 
    fow j in 0...len uwu
      if (aww[j] > aww[j+1]) uwu
        [aww[j], aww[j+1]] = [aww[j+1], aww[j]]
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
    aww[i - 1] = stwing(i)
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
