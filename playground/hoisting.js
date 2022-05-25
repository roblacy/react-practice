/*
var and function hoisted
let/const only declaration hoisted but not initialized
also class not initialized, would also be ReferenceError


*/

(function() {
    console.log('done');

    x = 5;
    console.log(x); // 5
    console.log(y); // undefined

    var x;
    var y;

    z = 5;
    //let z; // if uncommented then line 11 produces ReferenceError
    console.log(z); // 5
})();