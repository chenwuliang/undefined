function promiseAll(arr) {
    return new Promise((resolve, reject) => {
        const list = []
        let index = 0
        if (arr.length === 0) {
            resolve([])
            return
        }
        arr.map(item => {
            Promise.resolve(item).then((val) => {
                list[index] = val
                index++
                if (index === arr.length) resolve(list)
            })
                .catch((e) => {
                    reject(e)
                })
        })
    })
}
function createPromise(index) {
    return new Promise(res => {
        setTimeout(() => {
            console.log(index)
            res(index)
        }, index * 1000)
    })
}
const list = [
    createPromise(1),
    createPromise(2),
    createPromise(3),
    createPromise(10)
]
console.log("start")
promiseAll(list).then(res => {
    console.log(res)
    console.log("end")
}).catch(e => {
    console.log(e)
})

