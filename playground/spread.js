let a = [1,2,3],
    b = [4,5,6];

console.log([...a, ...b]); // all 6 elements

a.push(...b);
console.log(a); // has all 6 elements


let o1 = {
    a: 1,
    b: 2,
},
    o2 = {
    c: 3,
    d: 4,
};

console.log({...o1, ...o2}); // all 4 in one object


// rest - kind of like opposite of spread

function f(a, b, ...nums) {
    console.log(`${a} ${b} ${nums.length}`);
}

f('hi', 'there', 1,2,3,4); // hi there 4

// destructuring array assignment
const [one, two] = ['three', 'four'];
console.log(one); // three

// destructuring object assignment
const { name, size } = { name: 'bob', size: 'large '};
console.log(size); // large

// destructuring array with rest operator
const [x, y, ...letters] = ['hi', 'there', 'a', 'b', 'c'];
console.log(letters.join('')); // abc

// destructuring object with rest operator
const { m, n, ...attrs } = {
    hello: 'there',
    hi: 'bye',
    color: 'blue',
    size: 'big',
    age: 23,
};

console.log(attrs.age); // 23

