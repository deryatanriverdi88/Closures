# UNDERSTANDING CLOSURES IN JAVASCRIPT
The concept of closure is one of the topics in JavaScript that may be hard to wrap your head around. However they can be extremely useful once you get the hang of them! They can help you add a lot of reusable functionality to any web application. This helps us to save time when an application compiles and runs. So what is a closure you ask, well I am going to teach you by first breaking it down into smaller pieces, and go step by step to understand exactly what it is.
## What is a closure ?
An explanation by MDN Web Docs:
> "A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function's scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time."
To put it another way. A closure is a function that will return another function or a series of functions that will maintain the scope of its local variables, functions, and code executions. So before we can begin talking about how to make a closure we should really understand what scopes are!
## Let's talk about Scopes
Scopes determine the accessibility ( or visibility ) of variables. And there are 2 types:
- Local Scopes
- Global Scopes
## Local Scope
Variables declared within a JavaScript function belongs to its LOCAL scope. They can only be accessed within that function. Local variables are created when a function starts, and deleted when the function is completed.

```
function myFunction() {

    let count = 0;

    console.log(count);

};

myFunction(); // => 0 count is declared within myFunction's scope, therefore it is not eligible outside of that function.

console.log(count); // => ReferenceError: count is not defined

```
You can even re-use common variables names (count, index, current, value, etc) in different scopes without causing errors:

``` 
function myFunction() {

    // 'myFunction" function scope
    // This count variable belongs here, and it will log 0

    let count = 0;

    console.log(count);
};

function someFunction(){

    // 'someFunction" function scope
    // This count variable belongs here, and it will log 1

    let count = 1;

    console.log(count);
};

myFunction(); // => 0
someFunction(); // => 1
```
## Global Scope
Variables declared outside a function, belongs to GLOBAL scope. All scripts and functions on a web page can then access it.
```
let carName = "Volvo";

console.log(carName); // => "Volvo"

function myFunction() {

  // Code written inside this function can also use carName, because carName belongs to Global Scope

  console.log(carName);

};

myFunction(); // => "Volvo"
```

This is great but we can do so much more with scopes!

## Nesting Scopes

Let's play around a bit and put one scope inside another! This is called nesting:
```
function outerFunction(){

    // The outer scope

    let outerVar = "Outside variable";

   function innerFunction(){

       // The inner scope
       // The variables of the outer scope are accessible inside the inner scope 

       console.log(outerVar);

   }

   innerFunction();

}

outerFunction(); // => "Outside variable"
```
Let's take a look at it the code above and go step by step to understand how the code runs:
- A function called ``outerFunction()`` is defined with a variable of ``outerVar`` and function of ``innerFunction()`` in its body.
- The ``innerFunction()`` runs a console log of our ``outerVar``.

- Since there is no declaration of ``outerVar`` within ``innerFuction()``, JavaScript will consider ``outerVar`` same variable declared in ``outerFunction()``. However, if we were to create another ``outerVar`` within our ``innerFunction()``, our ``innerFunction()`` would defer to that variable first.

Here is another example:
```
let myGlobal = 0;

function myFunction() {

  let myVar = 1;

  console.log(myGlobal); // =>"0"

  function innerOfFunction() {

    let myInnerVar = 2;

    console.log(myVar, myGlobal); // =>"1 0"

    function innerOfInnerOfFunction() {

      console.log(myInnerVar, myVar, myGlobal); // => "2 1 0" 

    }

    innerOfInnerOfFunction();

  }

  innerOfFunction();

}

myFunction(); //=> 0 
                   1 0
                   2 1 0
```

Let's take a look at the code above line by line:
1. The variable ``myGlobal`` is declared in the Global Scope and its value is 0.
2. Next ``myFunction()`` is declared.
3. Within ``myFunction()``'s scope the variable ``myVar`` is declared with a value of 1.
4. Inside of ``myFunction()`` another function ``innerOfFunction()`` is declared with a variable of ``myInnerVar`` with in it's scope with a value of 2.
5. We then declare anothter function inside ``innerofFunction()`` called ``innerOfinnerOfFunctoion()``( example names are tricky!) which console logs the variables: ``myGlobal``, ``myVar``, and ``myInnerVar``. Because it is nested under both ``myFunction()`` and then ``innerOfFunction()`` it can access all of the variables above it.
5. ``innerOfFunction()`` then finishes by invoking ``innerOfInnerOfFunction()``.
6. Finally myFunction closes by invoking ``innerOfFunction()`` which will run all of the code nested within it.

*The outer scopes have no knowledge of variables within the inner scopes, and the inner scopes(if nested) knows about the variables in its outer scopes.*

## So what really is a closure?
The lexical environment allows us to access the variables statically of the outer scopes. We can continue to nest variables and functions under one another, however we have not yet created a closure. There's just one step until the closure!

Take a look at this code:

```
function outerFunction(){

  let counter = 0;

  function innerFunction(){

    console.log(counter+=1); 

   }

  innerFunction(); 
}
outerFunction(); // => 1 
outerFunction(); // => 1 counter didn't change because         everytime. outerFunction() is called, it sets the counter to 0, and adds 1 to it. 
```
Currently, ``innerFunction()`` is being invoked within ``outerFunction()``. Let's change that, and instead of invoking the function simply return the function.

Let's add the changes: 
```
function outerFunction(){

    let counter = 0;

    function innerFunction(){

      console.log(counter+=1); // Let's increment the counter

    }

    return innerFunction; // Note that we are not invoking the function, but just returning it. 

}
```
By returning the ``innerFunction()`` we can now save the outer function to different variables which will be its own instance of that function:
```
let invokeFirst = outerFunction() // => ƒ innerFunction(){

      console.log(counter+=1); // Le…

// outerFunction() invoked the first time

let invokeSecond = outerFunction() // => ƒ innerFunction(){

      console.log(counter+=1); // Le…

// outerFunction() invoked the first time

// By setting the invokeFirst and invokeSecond variables to outerFunction, its value becomes result of innerFunction.


invokeFirst() // => 1 invokeFirst() invoked the first time
invokeFirst() // => 2 invokeFirst() invoked the second time
invokeFirst() // => 3 invokeFirst() invoked the third time

invokeSecond() // => 1 invokeSecond() invoked the first time

```

Let us examine go over what happens when ``invokeFirst()`` is executed the first time:

1. Variable counter is created, and it's value is set to 0 inside of ``outerFunction()``.
2. ``outerFunction()`` invoked and runs only once when it is saved to the varaibles ``invokeFirst()`` and ``invokeSecond()``. 
3. JavaScript knows that variable counter no longer exists. Since ``counter`` is part of the ``outerFunction()``, ``counter`` would only exist while the ``outerFunction()`` is in execution. Since the ``outerFunction()`` finished execution long before we invoked ``invokeFirst()``, any variables within the scope of the outer function cease to exist, and hence variable ``counter`` no longer exists.

## But, how does it work really ?

The inner function can access the variables of the enclosing function due to closures in JavaScript. In other words, the inner function preserves the scope chain of the enclosing function at the time the enclosing function was executed, and thus can access the enclosing function’s variables. 

Still confused? A simpler way to put it is that when we save our ``outerFunction()`` to a new variable it runs once, it sets its variables and executes what is inside it and then returns the ``innerFunction()``. Now when we invoke our new variable as a function it runs the inner function only. The ``innerFunction()`` remembers everything the ``outerFunction()``passed to it and then executes its own code. Anything not passed to the ``innerFunction()`` will now be outside of its scope. Let's a take look at what that means:

```
function outerFunction(){

    let counter = 0;

    let anotherVar = "something" // This won't be remembered by innerFunction(), because outerFunction() returns the function of innerFunction() and innerFunction() doesn't use anotherVar. Therefore, it will be forgotten.

    function innerFunction(){

      console.log(counter+=1); // Let's increment the counter

   }

    return innerFunction;

}
```

## Popular use cases for closures

- Handle eventListeners
- Private methods
- Functional programming

## Handle eventListeners 

```
const myButton = document.getElementById("myButton");
const button = document.getElementById("button");

const myfunc = () => {

  let clicked = 0;

  const inner = () => {

    return clicked +=1;

  };

  return inner;

};

let callback = myfunc();

myButton.addEventListener("click", function handleClick() {

  myText.innerText = `You clicked ${callback()} times`;

});

```

**Why is it useful here?**

Here everytime we set ``myFunc()`` to a new variable it will provide us with a new ``clicked`` value starting at 0. This makes it reusable for a variety of different event listeners. Imagine adding likes to a social media page, or an applauding functionality.


## Private methods

We can emulate private methods using closures. Private methods provide us a great way to manage our global namespace and limit access to code.

```
let counter = (function() {

  let privateCounter = 0;

  function changeBy(val) {

    privateCounter += val;

  }

  return {

    increment: function() {

      changeBy(1);

    },

    decrement: function() {

      changeBy(-1);

    },

    value: function() {

      return privateCounter;

    }

  };

})();

console.log(counter.value());  // 0.

counter.increment();
counter.increment();
console.log(counter.value());  // 2.

counter.decrement();
console.log(counter.value());  // 1.
```

In the code above we are doing a few things. First, we are creating a private variable (``privateCounter`` with a value of 0) and a private function (``changeBy()`` which adds a value to the ``privateCounter`` variable). Both of these are private because we are not passing them to our statement. Second, our return statement we are creating an anonymous wrapper which contains three public objects: ``increment``, ``decrement`` and ``value``. The increment and decrement call on the ``changeBy()`` function to change the value of the the ``privateCounter`` by 1 or -1. The value simply returns the value of our ``privateCounter``.
The objects returned here can then be accessed by calling on our counter and calling on one of the keys of the function we wish to run( ex: ``counter.value()``)

## Functional programming
This is a really useful concept that we can use to help us avoid having to write the same code over and over again. We can create functional programming that, in turn, create utility functions we can use any time we find ourselves repeatedly writing similar code.

```
function division(a) {

  return function runDivision(b) {

    return b / a;

  }
  
}

const divideByTwo= division(2);
divideByTwo(4); // => 2
divideByTwo(6); // => 3

const divideByThree = division(3);
tridivideByThree(3); // => 1
tridivideByThree(9); // => 3
```


## Conclusion
If you find yourself reusing the same blocks of code over and over again closures are a great way to create reusable functions that can be placed where you need them!

## Resources

- [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)

- [W3Schools](https://www.w3schools.com/js/js_function_closures.asp)