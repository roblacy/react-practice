class Car {
    constructor() {
        this.f3 = this.f3.bind(this);

    }

    f1() {
        console.log(this);
    }

    f2 = () => {
        console.log(this);
    }

    f3() {
        console.log(this);
    }
}

let c = new Car();
c.f1();
c.f2();
c.f3;


c.f1.apply(null);
c.f2.apply(null);
c.f3.apply(null);