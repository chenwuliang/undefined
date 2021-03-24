Function.prototype.myBind = function (context = window) { // 原型上添加mybind方法
    var argumentsArr = Array.prototype.slice.call(arguments) // 类数组转数组
    var args = argumentsArr.slice(1) // 后面的参数
    var self = this // 调用的方法本身
    return function () { // 返回一个待执行的方法
        var newArgs = Array.prototype.slice.call(arguments) // 返回函数的arguments,类数组转数组或者使用es6解构赋值
        self.apply(context, args.concat(newArgs)) // 合并两args
    }
 }