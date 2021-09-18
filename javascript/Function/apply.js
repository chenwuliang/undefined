// eslint-disable-next-line no-extend-native
Function.prototype._apply = function (ctx = window, args) { // 固定参数数量
    const Sym = Symbol("fn")
    ctx[Sym] = this
    const result = ctx[Sym](...args)
    delete ctx[Sym]
    return result
}

function sum (a, b) {
    console.log(a + b, this)
}

var obj = {
    name: "橘子君"
}

sum._apply(obj, [1, 2]) // 输出：3 {name: "橘子君"}

