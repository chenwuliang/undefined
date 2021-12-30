// // 有效括号
// function isValid(str) {
//     if (str.length % 2 === 1) return false
//     let stack = [], i = 0
//     const list = ['[]', '{}', '()']

//     while (i < str.length) {
//         if (stack.length >= 1 && list.includes(stack[stack.length - 1] + str[i])) {
//             stack.pop()
//         } else {
//             stack.push(str[i])
//         }
//         i++
//     }
//     return stack.length === 0
// };
// 1 1 2 3 5
// // let res = isValid('[]{}()')
// let res = isValid('{{[[]]}}')
// console.log(res)
