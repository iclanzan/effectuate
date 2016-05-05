# Effectuate

Run exported function from any script passing in arguments from the command line. First argument can be passed in through stdin.

## Install

```sh
$ npm install -g effectuate
```

## Usage

### Passing arguments

```js
// multiply.js
module.exports = (a, b) => a * b
```

```sh
$ effectuate multiply 5 10
50
```

### Named arguments

```js
// getName.js
module.exports = config => config.first + ' ' + config.last
```

```sh
$ effectuate ./getName --first=John --last=Doe
John Doe
```

### Using stdin

```js
// double.js
module.exports = n => n * 2
```

```sh
$ echo 10 | effectuate-piped ./double
20
```

Can also provide stdin line by line:

```sh
$ echo -e "1\n2\n3" | effectuate-byline ./double
2
4
6
```

### Returning a promise

```js
// delay.js
module.exports = value => new Promise(
  resolve => setTimeout(() => resolve(value), 100)
)
```

```sh
$ effectuate ./delay foo
foo
```
