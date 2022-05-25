const MAKE = Symbol();
const MODEL = Symbol();

class Car {
    constructor(make, model) {
        this[MAKE] = make;
        this[MODEL] = model;
    }
}

let c = new Car('Ford', 'Bronco');
console.log(c);