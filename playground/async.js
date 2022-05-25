async function f1() {
    return 3;
}

const f2 = async () => {
    const x = await f1();
    return x + 1;
}

const f3 = async () => {
    return await f1();
}

f3().then(result => console.log(result));