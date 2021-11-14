function printA(num) {
    for (let i = 0; i < num; i++) {
        let s = ""
        for (let j = 0; j <= i; j++) {
            s += "*"
        }
        console.log(s)
    }
}

const  calcNumInLine = line => 2 * line - 1

function print(num) {
    let sum = calcNumInLine(num)
    for (let i = 1; i <= num; i++) {
        let s = ""
        for (let j = 1; j <= sum; j++) {
            let iSum = calcNumInLine(i)
            let left = (sum - iSum) / 2
            if (j > left && j <= sum - left) {
                s += "*"
            } else {
                s += " "
            }
        }
        console.log(s)
    }
}

printA(3)
printA(5)
printA(7)
print(9)