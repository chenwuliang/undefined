// eslint-disable-next-line no-extend-native
Function.prototype.myBind = function (context = window) { // 原型上添加mybind方法
    var argumentsArr = [...arguments] // 类数组转数组
    var args = argumentsArr.slice(1) // 后面的参数
    var self = this // 调用的方法本身
    return function () { // 返回一个待执行的方法
        var newArgs = [...arguments] // 返回函数的arguments,类数组转数组或者使用es6解构赋值
        self.apply(context, [...args, ...newArgs]) // 合并两args
    }
}

const obj = {
    name: "Im obj ",
    fn: function (...arg) {
        console.log(this.name, "name")
        console.log("arg", arg)
    }
}
const testFn = obj.fn
console.log(obj.fn())
console.log("绑定前")
testFn(123, 123)
console.log("绑定后")
testFn.myBind(obj, 11232222)(123, 321, 342)
