const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED ="REJECTED"
class Queue {
    constructor () {
        this.queue = []
        this.status = null
    }
    add (fn) {
        this.queue.push(fn)
        this.run()
    }
    dequeue () {
        return this.queue.shift()
    }
    run () {
        if (this.queue.length === 0) return
        if (this.status !== PENDING) {
            let fn = this.dequeue()
            return new Promise(async (resolve, reject) => {
                this.status = PENDING
                try {
                    let res = await fn()
                    resolve(res)
                } catch (err) {
                    reject(err)
                }
            }).then(() => {
                this.status = RESOLVED
                this.run()
            }).catch(() => {
                this.status = REJECTED
                this.run()
            })
        }
    }
}

const q = new Queue()
q.add(() => {
    console.log(1)
    return new Promise(resolve => setTimeout(resolve, 10*1000));
})
q.add(() => {
    console.log(2)
    return new Promise(resolve => setTimeout(resolve, 10*1000));
})
q.add(() => {
    console.log(3)
})
console.log(q)
/**
 * 
// const q = new Queue();
// q.add(() => {
//  console.log(1);
//  return new Promise(resolve => setTimeout(resolve, 10*1000));
// });
// q.add(() => {
//  console.log(2);
//  return new Promise(resolve => setTimeout(resolve, 10*1000));
// });
// q.add(() => {
//  console.log(3);
//  return new Promise(resolve => setTimeout(resolve, 10*1000));
// });
 */



//  [1,2,3,4,’a’, {x:1}]