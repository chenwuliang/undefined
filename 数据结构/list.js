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
const node1 = new Node(1)
const node2 = new Node(2)
const node3 = new Node(3)
const node4 = new Node(4)
const node5 = new Node(5)
list
.append(node1)
.append(node2)
.append(node3)
.append(node4)
.insert(2, node5)
console.log(list.toString())