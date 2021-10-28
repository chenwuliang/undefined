// 有效括号
const map = ['(', "[", "{"]
const rightMap = [')', "]", "}"]
function isValid(str) {
    if (str.length % 2 === 1) return false
    let stack = []
    for (let i = 0; i < str.length; i ++) {
        let s = str[i]
        if (stack.length > 0) {
            if ( map.includes(s) ) {
                stack.push(s)
            } else if (rightMap.includes(s)){
                let index = rightMap.indexOf(s)
                if (stack[stack.length - 1] === map[index]) {
                    stack.pop()
                } else {
                    stack.push(s)
                }
            }
        } else {
            stack.push(s)
        }
    }
    return stack.length === 0
};

// let res = isValid('[]{}()')
let res = isValid('{{[[]]}}')
console.log(res)