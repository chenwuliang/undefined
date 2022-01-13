interface Test {
    a: Number
}


function f() {
    console.log("f(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("f(): called");
    }
}

function check(test: Test): Boolean {
    if (test.a === 1) {
        return true
    }
    return false
}

const test = {
    a : 2
}

class Hello {
    
    @f()
    @f()
    method() {

    }
}


/**
 * tsc --target ES5 Javascript/TS/test.ts --experimentalDecorators
 */