let min = Number.MAX_VALUE
for (let i = 0; i < array1.length; i ++) {
    for (let j = 0; j < array2.length; j ++) {
        min = Math.min(min, array1[i] + array2[j])
    }
}
return min

let num = []
let firstNum = n => (n+"")[0] - 0
num.sort((a, b) => {
    return firstNum(a) - firstNum(b)
}).join('')