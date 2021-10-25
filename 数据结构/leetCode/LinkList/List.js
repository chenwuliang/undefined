// 链表
class Node {
    constructor(val) {
        this.val = val
        this.next = null
    }
}
class List {
    constructor(val = null) {
        this.head = val
        this.length = 0
    }
    append(node) {
        if (this.head) {
            let cur = this.head
            while (cur.next) {
                cur = cur.next
            }
            cur.next = node
        } else {
            this.head = node
        }
        this.length++
        return this
    }
    insert(index = 0, node) {
        let cur = this.head
        let position = 0
        if (index === 0) {
            const tmp = this.head
            this.head = node
            node.next = tmp
            return
        }
        if (index > this.length || index < 0) {
            throw new Error("数组越界")
        }
        while (position < index - 1) {
            cur = cur.next
            position++
        }
        const tmp = cur.next
        cur.next = node
        node.next = tmp
    }

    remove() {

    }
    /**
     * 缓存下一个元素
     * 当前元素指向上一个元素
     * pre指针指向当前元素
     * cur指针指向下一个元素
     */
    reverse() {
        let pre = null
        let cur = this.head
        while (cur) {
            const next = cur.next // 缓存下一个元素
            cur.next = pre // 当前元素指向上一个元素
            pre = cur // pre指针指向当前元素
            cur = next // cur指针指向下一个元素
        }
        this.head = pre
        return this
    }
    toString() {
        let str = ""
        let cur = this.head
        while (cur) {
            str += `${cur.val}->`
            cur = cur.next
        }
        str += null
        return str
    }
    toNumber() {
        let str = ""
        let cur = this.head
        while (cur) {
            str += `${cur.val}`
            cur = cur.next
        }
        return Number(str)
    }
    /**
     * https://leetcode-cn.com/problems/add-two-numbers/
     * @param {Array} array
     * @returns List
     */
    arrayToList(array) {
        array.map(item => this.append(new Node(item)))
        return this
    }
}

// eslint-disable-next-line no-unused-vars
function add(a, b) {
    // 取两个数字的最大长度
    const maxLength = Math.max(a.length, b.length)
    // 用0去补齐长度
    a = a.padStart(maxLength, 0)// "0009007199254740991"
    b = b.padStart(maxLength, 0)// "1234567899999999999"
    // 定义加法过程中需要用到的变量
    let t = 0
    let f = 0 // "进位"
    let sum = ""
    for (let i = maxLength - 1;i >= 0;i--) {
        t = parseInt(a[i]) + parseInt(b[i]) + f
        f = Math.floor(t / 10)
        sum = t % 10 + sum
    }
    if (f === 1) {
        sum = "1" + sum
    }
    return sum
}

const list = new List()
for (let i = 0;i <= 100;i++) {
    list.append(new Node(i))
}
list.insert(55, new Node("测试"))
console.log()
console.log(list.toString())
console.log(list.reverse().toString())
console.log()
