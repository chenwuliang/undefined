
/**
 * 208
 * https://leetcode-cn.com/problems/implement-trie-prefix-tree/submissions/
 */




class Node {
    constructor() {
        this.isEnd = false
    }

    insert(word) {
        if (!word) return
        let node = this
        for (let i = 0; i < word.length; i ++) {
            const v = node[word[i]]
            if (v) {
                node = v
            } else {
                node[word[i]] = new Node()
                node = node[word[i]]
            }
        }
        node.isEnd = true
    }
}

class Trie extends Node {
    search(word, startsWith = false) {
        if (word === "") return false
        let d = this
        const dfs = (node, index) => {
            if (word.length === index) return startsWith || node.isEnd
            const ch = word[index]
            if (ch === ".") {
                for (let key in node) {
                    if (dfs(node[key], index + 1)) {
                        return true
                    }
                }
            } else {
                if (node[ch]) {
                    return dfs(node[ch], index + 1)
                } else {
                    return false
                }
            }
            return false
        } 
        return dfs(d, 0)
    }
    startsWith(word) {
        return this.search(word, true)
    }
}
let dict = new Trie()
console.log(dict)

let arr = (["insert", "search", "search", "startsWith", "insert", "search"])
let arg = [["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
try {
    arr.map((method, i) => {
        dict[method](arg[i][0])
    })
} catch {
    
}

console.log(dict)
console.log()


