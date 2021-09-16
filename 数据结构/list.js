class Node {
    constructor(value) {
        this.value = value
        this.next = null
    }
}
class List {
    constructor() {
        this.head = null
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
            let tmp = this.head
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
        let tmp = cur.next
        cur.next = node
        node.next = tmp
    }
    reverse() {
        let pre = null
        let cur = this.head
        while(cur) {
            const next = cur.next
            cur.next = pre
            pre = cur
            cur = next
        }
        this.head = pre
        return this
    }
    toString() {
        let str = ""
        let cur = this.head
        while (cur) {
            str += `${cur.value}->`
            cur = cur.next
        }
        str += null
        return str
    }
}

let list = new List()
for (let i = 0; i <= 100; i ++) {
    list.append(new Node(i))
}
list.insert(55, new Node("测试"))
console.log()
console.log(list.toString())
console.log(list.reverse().toString())
console.log()