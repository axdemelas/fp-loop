# fp-loop
### A JavaScript functional module to simulate loops.

FP-Loop is just an **experimental** module that merges the traditional way of looping with functional programming concepts. This module defines a curried function that simulates an imperative loop behavior by using recursion. Its general purpose is to create immutable lists without side-effects.

## Download

### NPM
```bash
npm install fp-loop
```

### Build
```bash
git clone http://gitub.com/axdemelas/fp-loop
```

## Function applications

### loop
The `loop` is a curried function that takes five arguments.

```js
loop(init)(condition)(end)(callback)(list)
```

Argument | Type | Description
---------|------|---------
init | `any` | Defines the index value (commonly a `number`).
condition | `function` | Predicate that defines if the next recursive call should happen.
end | `function` | Produces the next value of `init`.
callback | `function` | Produces the next item value of `list`.
list | `array` | The initial list.

### arguments
The `condition`, `end` and `cabllback` are curried functions that takes two arguments.

```js
condition(index)(list)

end(index)(list)

callback(index)(list)
```

Argument | Type | Description
---------|------|---------
index | `any` | The current index value of loop.
list | `array` | The current list.


## Usage
First of all, import the module:

```js
import loop from 'fp-loop'

// or

const loop = require('fp-loop')
```

### Basic example:

```js
const listInitial = [] // Initial empty list.
const li =
  loop(1)(
    index => list => (index <= 3) // Will stop after 3 recursive calls.
  )(
    index => list => (index + 1) // Increases index by 1.
  )(
    index => list => index * 10 // Setting list items as indexes times 10.
  )(listInitial)

console.log(li) // [10, 20, 30]
```

### Currying benefits:

```js
const listInitial = [] // Initial empty list.

const listFrom1 = loop(1)

// Something...

const listFrom1To3 = listFrom1(
    index => list => (index <= 3) // Will stop after 3 recursive calls.
  )

// Something...

const listFrom1To3By1 = listFrom1To3(
    index => list => (index + 1) // Increases index by 1.
  )

// Something...

const listFrom1To3By1ItemTimes10 = listFrom1To3By1(
    index => list => index * 10 // Setting list items as indexes times 10.
  )

// Something...

const listFinal = listFrom1To3By1ItemTimes10(listInitial)

console.log(listFinal) // [10, 20, 30]
```

### Creating immutable list with positive numbers:

```js
const listInitial = []
const li =
  loop(1)(
    index => list => (index <= 10)
  )(
    index => list => (index + 1)
  )(
    index => list => index
  )(listInitial)

console.log(li) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

### Creating immutable list with negative numbers:

```js
const listInitial = []
const list =
  loop(-1)(
    index => list => (index >= -10)
  )(
    index => list => (index - 1)
  )(
    index => list => index
  )(listInitial)

console.log(li) // [-1, -2, -3, -4, -5, -6, -7, -8, -9, -10]
```

### Getting initial list:

The `condition` predicate (explicitly) return `false` on the first call.

```js
const listInitial = [1, 2, 3]
const li =
  loop()(
    index => list => false
  )()()(listInitial)

console.log(li) // [1, 2, 3]
```

### Infinite recursion (case 1):

The `index` argument will always receive the value `0` (because it's not increasing on `end` function) then `condition` predicate will always return `true`.

```js
const li =
  loop(0)(
    index => list => (index <= 10)
  )(
    index => list => index
  )(
    index => list => index
  )([])

// ...
```

### Infinite recursion (case 2):

The `condition` predicate explicitly will always return `true`.

```js
const li =
  loop(0)(
    index => list => true
  )(
    index => list => index
  )(
    index => list => index
  )([])

// ...
```
