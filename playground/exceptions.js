try {
    f1(Math.floor(Math.random() * 10));
    console.log('all good');
} catch (err) {
    console.log('caught an error');
    console.error(err);
} finally {
    console.log('done');
}



function f1(x) {
    if (x > 5) {
        throw new Error(`x ${x} is too big!`);
    }
}