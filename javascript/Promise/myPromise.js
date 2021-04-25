// https://promisesaplus.com/

/**
 * 1. new Promise时，需要传递一个 executor 执行器，执行器立刻执行
 * 2. executor 接受两个参数，分别是 resolve 和 reject
 * 3. promise 只能从 pending 到 rejected, 或者从 pending 到 fulfilled
 * 4. promise 的状态一旦确认，就不会再改变
 * 5. promise 都有 then 方法，then 接收两个参数，分别是 promise 成功的回调 onFulfilled, 
 *      和 promise 失败的回调 onRejected
 * 6. 如果调用 then 时，promise已经成功，则执行 onFulfilled，并将promise的值作为参数传递进去。
 *      如果promise已经失败，那么执行 onRejected, 并将 promise 失败的原因作为参数传递进去。
 *      如果promise的状态是pending，需要将onFulfilled和onRejected函数存放起来，等待状态确定后，再依次将对应的函数执行(发布订阅)
 * 7. then 的参数 onFulfilled 和 onRejected 可以缺省
 * 8. promise 可以then多次，promise 的then 方法返回一个 promise
 * 9. 如果 then 返回的是一个结果，那么就会把这个结果作为参数，传递给下一个then的成功的回调(onFulfilled)
 * 10. 如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个then的失败的回调(onRejected)
 * 11.如果 then 返回的是一个promise,那么需要等这个promise，那么会等这个promise执行完，promise如果成功，
 *   就走下一个then的成功，如果失败，就走下一个then的失败
 */
const PENDING = Symbol('PENDING')
const RESOLVED = Symbol('RESOLVED')
const REJECTED = Symbol('REJECTED')

const handlePromise = (promise, result, resolve, reject) => {
    if (promise === result) {
        throw new Error('循环引用对象')
    }
    let called = false
    if ((typeof result === 'object' && result !== null) || typeof result === 'function') {
        try {
            if (typeof result.then === 'function') {

            } else {
                resolve(result)
            }
        } catch (e) {
            // if (called) return
			// called = true;
            reject(e)
        }
    } else {
        resolve(result)
    }

}
class Promise {
    constructor (executor) {
        // 当前状态
        this.status = PENDING
        // 执行结果
        this.value = null
        // 失败原因
        this.reason = null
        // 成功回调事件
        this.onResolveCallbacks = []
        this.onRejectCallbacks = []
        let resolve = (value) => {
            if (value instanceof Promise) {
                value.then(resolve, reject)
                return
            }
            if (this.status === PENDING) {
                this.status = RESOLVED
                this.value = value
                this.onResolveCallbacks.forEach(fn => fn())
            }
        }
        let reject = (value) => {
            if (this.status === PENDING) {
                this.status = REJECTED
                this.reason = value
                this.onRejectCallbacks.forEach(fn => fn())
            }
        }
        try {
            executor(resolve, reject)
        } catch (err) {
            reject(err)
        }
    }
    then(onResolved, onRejected) {
        let result
        let promise = new Promise((resolve, reject) => {
            if (this.status === RESOLVED) {
                if (typeof onResolved === 'function') {
                    setTimeout(() => {
                        try {
                            result = onResolved(this.value)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0);
                }
            }
            if (this.status === REJECTED) {
                if (typeof onRejected === 'function') {
                    setTimeout(() => {
                        try {
                            result = onRejected(this.reason)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0);
                }
            }
            if (this.status === PENDING) {
                if (typeof onResolved === 'function') {
                    this.onResolveCallbacks.push(() => {
                        setTimeout(() => {
                            try {
                                result = onResolved(this.value)
                            } catch (e) {
                                reject(e)
                            }
                        }, 0);
                    })
                }
                if (typeof onRejected === 'function') {
                    this.onRejectCallbacks.push(() => {
                        setTimeout(() => {
                            try {
                                result = onRejected(this.reason)
                            } catch (e) {
                                reject(e)
                            }
                        }, 0);
                    })
                }
            }
        })
        return promise
        
    }
    catch(errCallback) {
        return this.then(null, errCallback)
    }
}

// let p = new Promise(function(resolve) {
//     resolve('执行成功')
// }).then(res => {
//     console.log('res', res)
// })
let p1 = new Promise(function(resolve) {
    setTimeout(() => {
        resolve('执行成功 2s')
    }, 2000);
})
.then(res => {
    console.log('res', res)
    console.log('p1', p1)
    return 'hahaha'
})
// .then(ress => {
//     console.log('ress',ress)
// })
console.log('p1', p1)

module.exports = Promise