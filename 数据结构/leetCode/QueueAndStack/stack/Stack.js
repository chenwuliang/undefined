/**
 * https://leetcode-cn.com/leetbook/read/queue-stack/g5l7d/
 */
class MinStack {
    constructor() {
        this.stack = []
    }

    push(val) {
        this.stack.push(val)
    }

    pop() {
        this.stack.pop()
    }

    top() {
        return this.stack[this.stack.length - 1]
    }

    getMin() {
        return Math.min(...this.stack)
    }
}