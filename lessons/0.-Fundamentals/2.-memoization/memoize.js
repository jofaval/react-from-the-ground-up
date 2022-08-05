/**
 * Memoizes a function
 * @param {string} name The name of the element
 * @param {array} params The element params
 * @returns {any}
 */
// const memoize = (name) => {

// };

const memoize = function (func) {
  const memoizedElements = {};
  const slice = Array.prototype.slice;

  return function () {
    // const stringifiedParams = params.toString();
    // const stringifiedParams = JSON.stringify(arguments);
    const stringifiedParams = slice.call(arguments);

    // console.log("stringified params", stringifiedParams, memoizedElements);

    if (!(stringifiedParams in memoizedElements)) {
      memoizedElements[stringifiedParams] = func.apply(
        this,
        slice.call(arguments)
      );
    }

    return memoizedElements[stringifiedParams];
  };
};

function sum(a, b) {
  const result = a + b;
  console.log("computing", result);
  return result;
}

const memoizedSum = memoize(sum);

console.log(memoizedSum(1, 3));
console.log(memoizedSum(1, 3));
console.log(memoizedSum(1, 3));

function sumWithObjects({ a, b }) {
  const result = a + b;
  console.log("computing with objects", result);
  return result;
}

const memoizedSumWithObjects = memoize(sumWithObjects);

console.log(memoizedSumWithObjects({ a: 1, b: 3 }));
console.log(memoizedSumWithObjects({ a: 1, b: 4 }));
console.log(memoizedSumWithObjects({ a: 1, b: 3 }));

function recursiveFactorial(n) {
  if (n < 1) return 1;

  console.log("computing recursive factorial of", n);

  return n * recursiveFactorial(n - 1);
}

// const memoizedRecursiveFactorial = memoize(recursiveFactorial);
const memoizedRecursiveFactorial = memoize(recursiveFactorial);

const number = 50;
// const number = 10;
// const number = 5;

console.log(memoizedRecursiveFactorial(number));
console.log(memoizedRecursiveFactorial(number));
console.log(memoizedRecursiveFactorial(number));
