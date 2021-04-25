// https://ts.xcatliu.com/
// https://jkchao.github.io/typescript-book-chinese/typings/indexSignatures.html

let arr = [
    {id: 1, name: 1},
    {id: 2, name: 2},
]
interface Item {
    id: Number
}
let id = 1
const item = arr.find((item: any) => item.id === id)
const code = item && item.name