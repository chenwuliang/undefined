// 函数柯里化
function add(a, b) {
    const c = a + b
    return c
}
function curry(fn) {
    if (fn.length <= 1) return fn
    const generator = (...arg) => {
        if (fn.length === arg.length) {
            return fn(...arg)
        } else {
            return (...arg2) => {
                return generator(...arg, ...arg2)
            }
        }
    }
    return generator
}

const addCurry = curry(add)

console.log(addCurry)
const res = addCurry(2, 3, 5, 5)
console.log("res: ", res)
