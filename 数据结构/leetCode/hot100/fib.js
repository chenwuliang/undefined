const v = 30
function fibnaqi(n) {
    let index = 0
    let map = {
        1: 1,
        2: 2,
        3: 3,
        4: 5
    }
    function fib(n) {
        index ++
        if (!map[n]) {
            map[n] = fib(n - 1) + fib(n - 2)
        }
        return map[n]
    }
    let r = fib(n)
    return r
}
fibnaqi(v)

function fib(n) {
    let index = 0
    function fn(n) {
        index ++
        if (n === 1) return 1
        if (n === 2) return 2
        else return fn(n - 1) + fn(n - 2)
    }
    const r = fn(n)
    console.log(index) 
    return r
}
fib(v)