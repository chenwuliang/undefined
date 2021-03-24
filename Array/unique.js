/**
 *  数组去重
 */
Array.prototype.unique = function () {
    return [...new Set(this)]
}



Array.prototype.max = function (...arg) {
    if (this.length === 0) return
    let max = this[0]
    for (let i = 0; i < this.length; i ++) {
        if (this[i] > max) {
            max = this[i]
        }
    }

    return max
}

Array.prototype.min = function (...arg) {
    if (this.length === 0) return
    let min = this[0]
    for (let i = 0; i < this.length; i ++) {
        if (this[i] < min) {
            min = this[i]
        }
    }

    return min
}