// https://leetcode-cn.com/leetbook/read/queue-stack/kzlb5/

/**
 * 622
 * https://leetcode-cn.com/problems/design-circular-queue/submissions/
 * / 

/**
 * Your MyCircularQueue object will be instantiated and called as such:
 * var obj = new MyCircularQueue(k)
 * var param_1 = obj.enQueue(value)
 * var param_2 = obj.deQueue()
 * var param_3 = obj.Front()
 * var param_4 = obj.Rear()
 * var param_5 = obj.isEmpty()
 * var param_6 = obj.isFull()
 */
class MyCircularQueue {
    constructor(k) {
        this.queue = new Array(k)
        this.head = 0
        this.tail = 0
        this.count = 0
    }

    enQueue(value) {
        if (this.isFull()) return false
        this.queue[this.tail] = value
        this.tail = (this.tail + 1) % this.queue.length
        this.count += 1
        return true
    }

    deQueue() {
        if (this.isEmpty()) return false
        this.queue[this.head] = null
        this.head = (this.head + 1) % this.queue.length
        this.count -= 1
        return true
    }

    Front() {
        if (this.isEmpty()) return -1
        return this.queue[this.head]
    }

    Rear() {
        if (this.isEmpty()) return -1
        return this.queue[(this.tail + this.queue.length - 1) % this.queue.length]
    }

    isEmpty() {
        return this.count === 0
    }

    isFull() {
        return this.count === this.queue.length
    }
}

/**
 * Your MyCircularQueue object will be instantiated and called as such:
 * var obj = new MyCircularQueue(k)
 * var param_1 = obj.enQueue(value)
 * var param_2 = obj.deQueue()
 * var param_3 = obj.Front()
 * var param_4 = obj.Rear()
 * var param_5 = obj.isEmpty()
 * var param_6 = obj.isFull()
 */
let v = new MyCircularQueue(3)
v.enQueue(1)
v.enQueue(2)
v.enQueue(3)
// v.enQueue(4)
v.deQueue()
v.deQueue()
v.deQueue()
// v.enQueue(4)
// v.Front()
// v.Rear()
console.log(v)