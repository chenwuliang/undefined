let arr = [1,3,54, 65, 65, 45, 54]


let arr2 = [
    {id: 13},
    {id: 13},
    {id: 126},
    {id: 14},
    {id: 23},
    {id: 25},
]
let arrSort = arr2.sort(function (a, b) {
    return b.id - a.id
})
console.log(arrSort)
