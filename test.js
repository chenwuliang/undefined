const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED ="REJECTED"
class Queue {
    constructor () {
        this.queue = []
        this.status = PENDING

    }
    add (fn) {
        if (this.status === PENDING) {
            return new Promise(function(resolve, reject) {
                try {
                    let res = fn()
                    resolve(res)
                    this.status = RESOLVED
                } catch (err) {
                    reject(err)
                    this.status = REJECTED
                }
            })
        }
        
    }
}

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