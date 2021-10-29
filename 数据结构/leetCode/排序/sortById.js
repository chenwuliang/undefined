// 根据ID排序
const arr = [
    {id: 13},
    {id: 13},
    {id: 126},
    {id: 14},
    {id: 23},
    {id: 25}
]
let compose = (a, b) => b.id - a.id
const arrSort = arr2.sort(compose)
let r = arrSort(arr)
console.log(arrSort)
console.log(r)
