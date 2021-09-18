// eslint-disable-next-line no-extend-native
Function.prototype._call = function (ctx = window, ...args) { // 用结构的方法解决可变参数的问题
    const Sym = Symbol("fn") // 创建临时属性
    ctx[Sym] = this // 修改this的指向
    const result = ctx[Sym](...args)
    delete ctx[Sym] // 删除临时属性
    return result
}

function sum (a, b) {
    console.log(a + b, this)
}

var obj = {
    name: "橘子君"
}

sum._call(obj, 1, 2) // 输出：3 {name: "橘子君"}
