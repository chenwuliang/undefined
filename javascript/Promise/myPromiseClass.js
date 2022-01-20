// enum 
const STATUS = {
    PENDING : "PENDING",
    RESOLVED :"RESOLVED",
    REJECTED : "REJECTED"
}

class MPromise {
    static status = STATUS.PENDING
    value = null
    reason = null
    onResolvedCallbacks = []
    onRejectCallbacks = []

    constructor (exec) {
        try {
            exec(this.resolve, this.reject)
        } catch (err) {
            reject(err)
        }
    }
    
    resolve =  (value) => {
        if (this.status === STATUS.PENDING) {
            this.status = STATUS.RESOLVED
            this.value = value
            this.onResolvedCallbacks.forEach(fn => fn())
        }
    }

    reject = (value) => {
        if (this.status === STATUS.PENDING) {
            this.status = STATUS.REJECTED
            this.reason = value
            this.onRejectCallbacks.forEach(fn => fn())
        }
    }
    

    then(func) {
        if (this.status === STATUS.RESOLVED) {
            func(this.value)
        }
        return this
    }

    catch(func) {
        if (this.status === STATUS.REJECTED) {
            func(this.reason)
        }
        return this
    }
}

let p = new MPromise(function(res, rej) {
    // setTimeout(() => {
        res('rngtjkrngk')
    // }, 3000);
}).then(res => {
    console.log("res", res)
})
console.log("p", p)