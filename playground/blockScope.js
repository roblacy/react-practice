
function f() {
    if(true) {
        var v = 1;
        let l = 2;
        const c = 3;
    }

    console.log(v); // 1
    console.log(l); // error
    console.log(c); // error
}

f();

console.log(v); // error
console.log(l); // error
console.log(c); // error
