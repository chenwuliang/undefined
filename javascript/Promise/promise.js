const PENDING = "PENDING"
const RESOLVED = "RESOLVED"
const REJECTED = "REJECTED"

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError("[TypeError: Chaining cycle detected for promise #<Promise>]----"))
    }
    let called
    if ((typeof x === "object" && x != null) || typeof x === "function") {
        try {
            const then = x.then
            if (typeof then === "function") {
                then.call(x, y => {
                    if (called) return
                    called = true
                    resolvePromise(promise2, y, resolve, reject)
                }, r => {
                    if (called) return
                    called = true
                    reject(r)
                })
            } else {
                resolve(x)
            }
        } catch (e) {
            if (called) return
            called = true
            reject(e)
        }
    } else {
        resolve(x)
    }
}

class Promise {
    constructor(executor) {
        this.status = PENDING
        this.value = undefined
        this.onResolvedCallbacks = []
        const resolve = (value) => {
            if (this.status === PENDING) {
                this.value = value
                this.status = RESOLVED
                this.onResolvedCallbacks.forEach(
                    fn => fn()
                )
            }
        }
        executor(resolve)
    }
    then(onfulfilled) {
        const promise2 = new Promise((resolve) => {
            if (this.status === PENDING) {
                this.onResolvedCallbacks.push(
                    () => {
                        const x = onfulfilled(this.value)
                        resolve(x)
                    }
                )
            }
        })

        return promise2
    }
}

new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(100)
    }, 4000)
    setTimeout(() => {
        reject(200)
    }, 3000)
}).then(
    res => {
        console.log(res)
    }
)

module.exports = Promise
