class Vehicle {
    constructor(name, numWheels) {
        this.name = name;
        this.numWheels = numWheels;
    }

    describe() {
        console.log(`${this.name} has ${this.numWheels} wheels.`);
    }
}

class Car extends Vehicle {
    constructor(name) {
        super(name, 4);
    }
}

let c = new Car('volvo');
c.describe();