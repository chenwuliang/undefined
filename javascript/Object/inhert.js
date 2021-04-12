// https://juejin.cn/post/6914216540468576263#heading-0


// 一。原型链继承
function Parent() {
    this.isShow = true
    this.info = {
        name: "yhd",
        age: 18,
    };
}

Parent.prototype.getInfo = function() {
    console.log(this.info);
    console.log(this.isShow); // true
}

function Child() {};
Child.prototype = new Parent();

let Child1 = new Child();
Child1.info.gender = "男";
Child1.getInfo();  // {name: "yhd", age: 18, gender: "男"}

let child2 = new Child();
child2.getInfo();  // {name: "yhd", age: 18, gender: "男"}
child2.isShow = false
console.log(child2.isShow); // false
 


// 二、盗用构造函数继承(构造函数继承)
function Parent() {
    this.info = {
      name: "yhd",
      age: 19,
    }
}
function Child() {
    Parent.call(this)
}

let child1 = new Child();
child1.info.gender = "男";
console.log(child1.info); // {name: "yhd", age: 19, gender: "男"};

let child2 = new Child();
console.log(child2.info); // {name: "yhd", age: 19}



// 三、组合继承
function Parent(name) {
    this.name = name
    this.colors = ["red", "blue", "yellow"]
 }
 Parent.prototype.sayName = function () {
    console.log(this.name);
 }
 
 function Child(name, age) {
    // 继承父类属性
    Parent.call(this, name)
    this.age = age;
}
// 继承父类方法
Child.prototype = new Parent();

Child.prototype.sayAge = function () {
    console.log(this.age);
}

let child1 = new Child("yhd", 19);
child1.colors.push("pink");
console.log(child1.colors); // ["red", "blue", "yellow", "pink"]
child1.sayAge(); // 19
child1.sayName(); // "yhd"

let child2 = new Child("wxb", 30);
console.log(child2.colors);  // ["red", "blue", "yellow"]
child2.sayAge(); // 30
child2.sayName(); // "wxb"



// 五、寄生式继承
function objectCopy(obj) {
    function Fun() { };
    Fun.prototype = obj;
    return new Fun();
}

function createAnother(original) {
    let clone = objectCopy(original);
    clone.getName = function () {
        console.log(this.name);
    };
    return clone;
}

let person = {
    name: "yhd",
    friends: ["rose", "tom", "jack"]
}

let person1 = createAnother(person);
person1.friends.push("lily");
console.log(person1.friends);
person1.getName(); // yhd

let person2 = createAnother(person);
console.log(person2.friends); // ["rose", "tom", "jack", "lily"]
  

// 六。寄生组合继承
function objectCopy(obj) {
    function Fun() { };
    Fun.prototype = obj;
    return new Fun();
}

function inheritPrototype(child, parent) {
    let prototype = objectCopy(parent.prototype); // 创建对象
    prototype.constructor = child; // 增强对象
    Child.prototype = prototype; // 赋值对象
}

function Parent(name) {
    this.name = name;
    this.friends = ["rose", "lily", "tom"]
}

Parent.prototype.sayName = function () {
    console.log(this.name);
}

function Child(name, age) {
    Parent.call(this, name);
    this.age = age;
}

inheritPrototype(Child, Parent);
Child.prototype.sayAge = function () {
    console.log(this.age);
}

let child1 = new Child("yhd", 23);
child1.sayAge(); // 23
child1.sayName(); // yhd
child1.friends?.push("jack");
console.log(child1.friends); // ["rose", "lily", "tom", "jack"]

let child2 = new Child("yl", 22)
child2.sayAge(); // 22
child2.sayName(); // yl
console.log(child2.friends); // ["rose", "lily", "tom"]



class Point {
    constructor (x, y) {
        console.log(new.target.name)
        this.x = x
        this.y = y
    }
    point () {
        console.log('Point')
    }
    pname = 'point'
}

class Color extends Point {
    constructor (name, x, y) {
        super(x, y)
        this.name = name
    }
    say () {
        console.log(this.name)
    }
    test () {
        console.log(super.point)
        console.log(super.pname)
    }
}

new Point(1,2)
new Color('c', 3, 4)

