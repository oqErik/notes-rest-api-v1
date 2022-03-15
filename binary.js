let numbers = [ 47, 8, 13, 66, 70, 14, 12, 11, 68, 35, 14, 68, 74, 79, 74, 24, 14, 67,
    12, 42, 10, 67, 97, 96, 37, 64, 40, 26, 60, 36, 14, 97, 84, 41, 38, 90, 37, 41,
    52, 29, 5, 84, 11, 68, 65, 48, 9, 6, 23, 80 ];

let find = 14;

console.log(numbers.length);

numbers.sort((a, b) => {
    return (a == b) ? 0 : (a > b) ? 1 : -1;
})


const dividirArray = (numbers, find) => {
    console.table(numbers);
    mitad = Math.round(numbers.length / 2);
    if (find == numbers[ mitad ]) return console.log(`found it  at ${mitad}`);
    if (find < numbers[ mitad ]) {
        let newNumbers = [];
        for (let i = 0; i < mitad; i++) {
            newNumbers.push(numbers[ i ])

        }


        return dividirArray(newNumbers, find)
    } else {
        let newNumbers = [];
        for (let i = mitad; i < numbers.length; i++) {
            newNumbers.push(numbers[ i ])

        }


        return dividirArray(newNumbers, find)
    }



}

dividirArray(numbers, find)