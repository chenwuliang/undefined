
function deepClone (obj) {
    if (typeof obj === null) return null
    if (obj instanceof RegExp) return new RegExp(obj)
    if (obj instanceof Date) return new Date(obj)
    if (typeof obj !== 'object') return obj 
    else {
        let newObj = new obj.constructor
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                newObj[key] = deepClone(obj[key])
            }
        }
        return newObj
    }
}

let test = {
    name: 'fvrege',
    age: 1,
    date: new Date,
    reg: new RegExp,
    reg2: /^2$/,
    err: new Error('err')
}
let obj2 = deepClone(test)
// console.log(test)
console.log(obj2)
console.log(obj2 === test)