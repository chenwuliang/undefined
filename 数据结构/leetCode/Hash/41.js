// https://leetcode-cn.com/problems/first-missing-positive/
/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function(arr) {
    let map = {}
    arr.map(item => map[item] = 1)
    const max = Math.max(...arr)
    if (max <= 0) return 1
    for (let i = 0; i <= max + 1; i ++) {
        if (map[i] !== 1 && i > 0) {
            return i
        }
    }
};

let m = firstMissingPositive([1, 2, 3, -1])

console.log(m)