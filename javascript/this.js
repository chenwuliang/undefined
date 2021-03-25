// this指向问题

// 情况一：纯粹的函数调用
var x = 1;
function test() {
   console.log(this.x);
}
test();  // 1

// 情况二：作为对象方法的调用
// 函数还可以作为某个对象的方法调用，这时this就指这个上级对象。
function test1() {
    console.log(this.x);
}
var obj = {};
obj.x = 1;
obj.m = test1;
obj.m(); // 1

// 情况三 作为构造函数调用
// 所谓构造函数，就是通过这个函数，可以生成一个新对象。这时，this就指这个新对象
function test() {
    this.x = 1;
}
var obj = new test();
obj.x // 1

// 箭头函数中 this
var x = 1
var test = () => {
    const x = 2
    console.log(this) // global
    console.log(this.x)
}