
/**
 * 211 前缀树搜索单词
 * https://leetcode-cn.com/problems/design-add-and-search-words-data-structure/
 */

class WordDictionary {
    constructor() {
        this.rootMap = new Trie()
        // this.rootArray = new TrieNode2()
        // this.rootLeetCode = new TrieNode3()
    }

    addWord(word) {
        this.rootMap.insert(word)
        // this.rootArray.insert(word)
        // try {
        //     this.rootLeetCode.insert(word)
        // } catch(e) {
        //     console.log(e)
        // }
    }

    search(word) {
        return this.rootMap.search(word)
    }
}


class Trie {
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
                node[word[i]] = new Trie()
                node = node[word[i]]
            }
        }
        node.isEnd = true
    }

    search(word, startWith = false) {
        if (word === "") return false
        let d = this
        const dfs = (node, index) => {
            if (word.length === index) return startWith || node.isEnd
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

    startWith(word) {
        this.search(word, true)
    }
}


class TrieNode2 {
    constructor() {
        this.children = []
        // this.isEnd = false
    }
    insert(word) {
        if (!word) return
        let node = this
        for (let i = 0; i < word.length; i ++) {
            const index = node.children.findIndex(ele => ele.value === word[i])
            if (index !== -1) {
                node = node.children[index]
            } else {
                node.children.push({
                    value: word[i],
                    children: []
                })
                node = node.children[node.children.length - 1]
            }
        }
        // node.isEnd = true
    }

    search() {

    }
}

class TrieNode3 {
    constructor() {
        this.children = new Array(26).fill(0);
        this.isEnd = false;
    }

    insert(word) {
        let node = this;
        for (let i = 0; i < word.length; i++) {
            const ch = word[i];
            const index = ch.charCodeAt() - 'a'.charCodeAt();
            if (node.children[index] === 0) {
                node.children[index] = new TrieNode3();
            }
            node = node.children[index];
        }
        node.isEnd = true;
    }

    getChildren() {
        return this.children;
    }

    isEnd() {
        return this.isEnd;
    }
}



let dict = new WordDictionary()
console.log(dict.rootMap)

let arr = 
// ["addWord","addWord","addWord","addWord","search","search","addWord","search","search","search","search","search","search"]
(["addWord","addWord","search","search","starts","search","search","search","search","search"])
let arg = 
// [["at"],["and"],["an"],["add"],["a"],[".at"],["bat"],[".at"],["an."],["a.d."],["b."],["a.d"],["."]]
[["apple"],["applea"],["apple"],["app"],["ab"],[".a"],[".b"],["ab."],["."],[".."]]

arr.map((method, i) => {
    dict[method](arg[i][0])
})

console.log(dict)
console.log()


