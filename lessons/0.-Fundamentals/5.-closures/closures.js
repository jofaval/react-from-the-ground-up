// Let's create a function that will ALWAYS ask for a name
function hello(name) {
  return `Hello, ${name}!`;
}

// Our closure will always provide that name, the same name
function closureHello() {
  const name = "World";

  // The return should always be a function,
  // and inside that functiom is where we can do what we want
  return function () {
    return hello(name);
  };
}

// Now, this two functions will compute the same exact result
const assertResultsAreEqual = hello("World") === closureHello(); // true

// Kind of a silly example, but it simplifies the concept, let's see a use case

//
// Use case
//
// Suppose we want to store a state
// (just a set of data, nothing too complex for now)
// and we want to create a snapshot before or after we've done something,
// closures come to the rescue
//

// Simple ES6 class (it'd work the same with objects)
class StateManager {
  constructor() {
    this.mySuperCoolContext = {
      clients: [],
    };
  }

  snapshot() {
    return function () {
      return this.mySuperCoolContext;
    };
  }
}

// We initialize the class instance
const stateManagerInstance = new StateManager();
// Create an earlysnapshot
const snapshot = stateManagerInstance.snapshot();

// And (in a bad way) add a client to our state
stateManagerInstance.mySuperCoolContext.clients.push({
  name: "International",
  surname: "Bussiness Men",
  bussiness: "International Bussiness Meeting",
  reference: "HIMYM S1E3",
});

// We'll have no clients still, since
// the snapshot was made BEFORE the addition
snapshot(); // { clients: [] }
