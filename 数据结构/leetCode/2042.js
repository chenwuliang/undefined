/**
 * @param {string} s
 * @return {boolean}
 */
var areNumbersAscending = function(s) {
    let arr = s.split(" ").filter(item => !isNaN(Number(item))).map(item => item - 0)
    for (let i = 0; i < arr.length - 1; i ++) {
        if (arr[i+1] <= arr[i]) return false
    }
    return true
};


let 
// r = areNumbersAscending('hello wordl 5 x 5')
r = areNumbersAscending("1 box has 3 blue 4 red 6 green and 12 yellow marbles")
// r = areNumbersAscending("sunset is at 7 51 pm overnight lows will be in the low 50 and 60 s")
console.log(r)
