const PENDING = Symbol('PENDING')
const RESOLVED = Symbol('RESOLVED')
const REJECTED = Symbol('REJECTED')
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