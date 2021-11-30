/**
 * @param {number} m
 * @param {number} n
 */
var Solution = function(m, n) {
    this.m = m
    this.n = n
    this.length = m * n
    this.reset()
};

/**
 * @return {number[]}
 */
Solution.prototype.flip = function() {
    if (this.sum === this.length) return [0, 0]
    let random = Math.floor(Math.random() * (this.length - this.sum))
    let index = 0
    for (let i = 0; i < this.martix.length; i ++) {
        for (let j = 0; j < this.martix[i].length; j ++) {
            if (this.martix[i][j] === 1) {
                continue
            }
            if (index === random) {
                this.martix[i][j] = 1
                this.sum ++
                return [i, j]
            }
            index ++
        }
    }
};

/**
 * @return {void}
 */
Solution.prototype.reset = function() {
    this.martix = new Array(this.m)
    for (let i = 0; i < this.martix.length; i ++) {
        this.martix[i] = new Array(this.n).fill(0)
    }
    this.sum = 0
};


/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(m, n)
 * var param_1 = obj.flip()
 * obj.reset()
 */
var obj = new Solution(3, 1)
param_1 = obj.flip()
param_1 = obj.flip()
param_1 = obj.flip()
param_1 = obj.reset()
param_1 = obj.flip()
