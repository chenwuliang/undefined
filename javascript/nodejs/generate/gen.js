var co = require("co")
function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(time + " " + Date.now())
        }, time * 1000);
    })
}
function* gen(v) {
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
// const g = gen()
// g.next(1)
// g.next(2)
// g.next(3)
console.log("start")
co(gen, 1, 2, 3).then(res => console.log(res))
console.log("end")
