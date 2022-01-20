/**
 * @param {number} n
 * @return {number}
 */

/**
 * 
字符串中的每个字符都应当是小写元音字母（'a', 'e', 'i', 'o', 'u'）
每个元音 'a' 后面都只能跟着 'e'
每个元音 'e' 后面只能跟着 'a' 或者是 'i'
每个元音 'i' 后面 不能 再跟着另一个 'i'
每个元音 'o' 后面只能跟着 'i' 或者是 'u'
每个元音 'u' 后面只能跟着 'a'
 */

var countVowelPermutation = function(n) {
    if (n === 0) return 0
    if (n === 1) return 5
    let arr = ['a', 'e', 'i', 'o', 'u']
    let ans = 0
    let list = new Array()
    arr.map(item => {
        list.push(new Trie(item))
    })
    for (let i = 0; i < n; i ++) {
        list[i].add(n)
    }
    return list.reduce((pre, next) => pre.sum() + next.sum(), 0)
};

class Trie {
    constructor(value) {
        this.value = value
        this.children = []
        this.index = 1
        this.cur = this
    }
    add(n) {
        while (this.index <= n) {
            if (this.cur.value === 'a') {
                this.cur.children.push('e')
            } else if (this.cur.value === 'e') {
                this.cur.children = ['a', 'i']
            } else if (this.cur.value ===  'i') {
                this.cur.children = ['a', 'e', 'o', 'u']
            } else if (this.cur.value === 'o') {
                this.cur.children = ['o', 'i']
            } else {
                this.cur.children = ['a']
            }
            this.index ++
            this.cur = this.cur
        }
    }
    sum() {

    }
}