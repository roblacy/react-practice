function* test1() {
    for(let i=0;i<10;i++) {
        yield i;
    }
}

let g = test1();
let val = g.next();
while(!val.done) {
    console.log(val.value);
    val = g.next();
}
