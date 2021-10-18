var co = require("co")
const sleep = time => new Promise(resolve => setTimeout(resolve(), time * 1000))
function * gen() {
    console.log(Date.now())
    var step1 = yield sleep(5)
    console.log("step1", step1)

    var step2 = yield [2]
    console.log("step2", step2)

    var step3 = yield Promise.resolve(1)
    console.log("step3", step3)

    yield sleep(1)
    return "c"
}
console.log("start")
co(gen).then(res => console.log(res))
console.log("end")
