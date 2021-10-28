// 1. 匹配文件夹

const arr = ['abc', 'abc(1)', "abc(2)", 'asdqw', 'data.dat', 'data2.dat']

function find(s) {
    return arr
        .map(item => item.match(new RegExp(`(^${str})\((.*?)\)$`)))
        .filter(item => item !== null)
}
let str = 'abc'
let res = find(str)
console.log(res)
