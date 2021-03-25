function _new (Fn, ...args) {
    // 1. 参数判断检测
    const isFunction = typeof Fn === 'function';
    function isConstructor(f) {
        if (f === Symbol) return false;
        try {
            Reflect.construct(String, [], f);
        } catch (e) {
            return false;
        }
        return true;
    }
    
    if (!isFunction || !isConstructor(Fn)) {
        throw new TypeError(`${Fn.name || Fn} is not a constructor`);
    }

    // 1. 创建一个继承构造函数.prototype的空对象
    var obj = Object.create(Fn.prototype);
    // 2. 让空对象作为函数 A 的上下文，并调用 A，同时获取它的返回值
    let result = Fn.call(obj, ...args);
    // 3. 如果构造函数返回一个对象，那么直接 return 它，否则返回内部创建的新对象
    return result instanceof Object ? result : obj;
}

function Animal (name) {
    this.name = name
}
