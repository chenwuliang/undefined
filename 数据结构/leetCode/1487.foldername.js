// https://leetcode-cn.com/problems/making-file-names-unique/
/**
 * @param {string[]} names
 * @return {string[]}
 */
// let str = 'abc';["abc(1)", "abc", "abc(0)", "abc(c)"].map(ele => ele.match(/^\(\d\)$/))
// let arr = ["abc(1)", "abc(2)", "abc", "abc", 'abc', '(1)','b', 'abc(']
let arr2 = ["kaido","kaido(1)","kaido","kaido(1)","kaido(2)"]
var getFolderNames = function(names) {
    const map = {}
    const res = []
    const isNumber = name => typeof name === 'number'
    names.map(item => {
        if (isNumber(map[item])) {
            let name
            do {
                map[item] += 1
                name = `${item}(${map[item]})`
            } while(isNumber(map[name]))
        }
        map[item] = 0
        res.push(item)
    })
    return res
};

// let res = getFolderNames(arr2)
// console.log("res", res)

var getFolderNames = function(names) {
    const map = {}
    const res = []
    const isNumber = name => typeof name === 'number'
    names.map(item => {
        if (isNumber(map[item])) {
            let name
            do {
                map[item] += 1
                name = `${item}(${map[item]})`
            } while(isNumber(map[name]))
            map[name] = 0
            res.push(name)
        } else {
            map[item] = 0
            res.push(item)
        }
    })
    return res
};