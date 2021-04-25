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

let add_curry = curry(add)

console.log(add_curry)
const res = add_curry(2, 3, 5, 5)
console.log('res: ',res)